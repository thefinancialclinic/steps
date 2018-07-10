import { Repository } from './Repository';
import { Pool, Client } from 'pg';
import { placeholders } from '../util';
import { User } from './UserRepository';

export type TaskId = number;
export type TaskStatus = 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
export type TaskDifficulty = 'EASY' | 'MODERATE' | 'DIFFICULT';

// Collection of string key-value pairs
export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

export type Step = {
  text: string;
  note?: string;
};

export class Task {
  id?: number;
  title: string;
  category: string;
  description?: string;
  status?: TaskStatus;
  created_by?: number;
  user_id?: number;
  difficulty?: TaskDifficulty;
  date_created: Date;
  date_completed?: Date;
  date_assigned?: Date;
  recurring?: ObjectType;
  steps?: Step[];
  order?: number;
  original_task_id?: number;

  constructor(opts: Partial<Task>) {
    this.id = opts.id;
    this.title = opts.title;
    this.category = opts.category;
    this.description = opts.description;
    this.status = opts.status;
    this.created_by = opts.created_by;
    this.user_id = opts.user_id;
    this.difficulty = opts.difficulty;
    this.date_created = opts.date_created;
    this.date_completed = opts.date_completed;
    this.date_assigned = opts.date_assigned;
    this.recurring = opts.recurring;
    this.steps = opts.steps;
    this.order = opts.order;
    this.original_task_id = opts.original_task_id;
  }
}

export class TaskRepository implements Repository<TaskId, Task> {
  constructor(public pool: Pool) {}

  async filterAll(filters: { status: TaskStatus }): Promise<Task[]> {
    const res = await this.pool.query(
      `
      SELECT *
      FROM task
      WHERE status = $1
      ORDER BY "order"
    `,
      [filters.status],
    );
    return res.rows.map(row => new Task(row));
  }

  async save(task: Task): Promise<Task> {
    try {
      const res = await this.pool.query(
        `
        INSERT INTO task (
          title,
          category,
          description,
          status,
          created_by,
          user_id,
          difficulty,
          date_created,
          date_completed,
          recurring,
          steps,
          "order",
          date_assigned,
          original_task_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        RETURNING *
      `,
        [
          task.title,
          task.category,
          task.description,
          task.status,
          task.created_by,
          task.user_id,
          task.difficulty,
          task.date_created,
          task.date_completed,
          task.recurring,
          task.steps,
          task.order,
          task.date_assigned,
          task.original_task_id,
        ],
      );
      return new Task(res.rows[0]);
    } catch (err) {
      throw `Could not create Task (${err})`;
    }
  }

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM task WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      q = q + ` ORDER BY "order"`;
      const res = await this.pool.query(q);
      return res.rows.map(user => new Task(user));
    } catch (err) {
      throw `Could not query Tasks (${err})`;
    } finally {
      client.release();
    }
  }

  async getOne(id: TaskId) {
    try {
      const result = await this.get({ id });
      if (result.length > 0) {
        return result[0];
      } else {
        throw `Task not found (id: ${id})`;
      }
    } catch (err) {
      throw `Could not query tasks (${err})`;
    }
  }

  async getTemplateTasks() {
    try {
      const res = await this.pool.query(
        `
        SELECT *
        FROM task
        WHERE user_id is null
        AND created_by is null
        ORDER BY "order"
      `,
      );
      return res.rows.map(row => new Task(row));
    } catch (err) {
      throw `Could not query template tasks (${err})`;
    }
  }

  async getOrgTasks(orgId: number) {
    try {
      const clientTasks = await this.getAssignedToOrgClients(orgId);
      const templateTasks = await this.getCreatedByOrgCoaches(orgId);
      return [...templateTasks, ...clientTasks];
    } catch (err) {
      throw `Could not query org tasks (${err})`;
    }
  }

  async getAssignedToOrgClients(orgId: number) {
    try {
      const res = await this.pool.query(
        `
        SELECT *
        FROM task
        WHERE user_id is not null
        AND created_by = $1
        ORDER BY "order"
      `,
        [orgId],
      );
      return res.rows.map(row => new Task(row));
    } catch (err) {
      throw `Could not query org client tasks (${err})`;
    }
  }

  async getCreatedByOrgCoaches(orgId: number) {
    try {
      const res = await this.pool.query(
        `
        SELECT *
        FROM task
        WHERE user_id is null
        AND created_by = $1
        ORDER BY "order"
      `,
        [orgId],
      );
      return res.rows.map(row => new Task(row));
    } catch (err) {
      throw `Could not query org template tasks (${err})`;
    }
  }

  async getAssignedByCoach(coachId: number) {
    try {
      const res = await this.pool.query(
        `
        SELECT task.*
        FROM task
        JOIN "user" usr ON usr.id = task.user_id
        WHERE usr.coach_id = $1
        ORDER BY "order"
      `,
        [coachId],
      );
      return res.rows.map(row => new Task(row));
    } catch (err) {
      throw `Could not query assigned tasks by coach (${err})`;
    }
  }

  async getAll() {
    try {
      return this.get({});
    } catch (err) {
      throw `Could not query all tasks (${err})`;
    }
  }

  async delete(id: TaskId): Promise<number> {
    const res = await this.pool.query(`DELETE FROM task WHERE id = $1`, [id]);
    return res.rowCount;
  }

  async update(taskOpts, taskId: TaskId): Promise<Task> {
    if (Object.keys(taskOpts).length === 0) {
      const result = await this.get({ id: taskId });
      return result[0];
    }
    const client = await this.pool.connect();
    const rawColumns = Object.keys(taskOpts);
    const columns = rawColumns.map(col => client.escapeIdentifier(col));
    const values = rawColumns.map(col => taskOpts[col]);
    const valPlaceholders = placeholders(2, values.length);
    try {
      const result = await client.query(
        `UPDATE task SET (${columns.join(', ')}) = ROW(${valPlaceholders})
        WHERE id = $1
        RETURNING *`,
        [taskId, ...values],
      );
      return new Task(result.rows[0]);
    } catch (err) {
      throw `Could not update Task (${err})`;
    } finally {
      client.release();
    }
  }

  async owner(taskId?: TaskId): Promise<User> {
    if (taskId == null || taskId == undefined) {
      return null;
    }
    try {
      const res = await this.pool.query(
        `
        SELECT client.*
        FROM task
        JOIN "user" client ON client.id = task.user_id
        WHERE client.type = 'Client'
        AND task.id = $1
        ORDER BY "order"
      `,
        [taskId],
      );
      if (res.rows.length < 1) throw `Could not find task owner`;
      return new User(res.rows[0]);
    } catch (err) {
      return null;
    }
  }

  async creator(taskId?: TaskId): Promise<User> {
    if (taskId == null || taskId == undefined) {
      return null;
    }
    try {
      const res = await this.pool.query(
        `
      SELECT coach.*
      FROM task
      JOIN "user" client ON client.id = task.user_id
      JOIN "user" coach ON coach.id = client.coach_id
      WHERE client.type = 'Client'
      AND coach.type = 'Coach'
      AND task.id = $1
      ORDER BY "order"
      `,
        [taskId],
      );
      if (res.rows.length < 1) throw `Could not find task creator`;
      return new User(res.rows[0]);
    } catch (err) {
      return null;
    }
  }
}
