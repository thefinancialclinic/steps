import { Repository } from './Repository';
import { Pool, Client } from 'pg';
import { placeholders } from '../util';

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
  recurring?: ObjectType;
  steps?: Step[];

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
    this.recurring = opts.recurring;
    this.steps = opts.steps;
  }
}

export class TaskRepository implements Repository<TaskId, Task> {
  constructor(public pool: Pool) {}

  async getOne(id: TaskId): Promise<Task> {
    // Return a single Task along with the all the steps that belong to it.
    const res = await this.pool.query(
      `
      SELECT
        t.id,
        t.title,
        t.category,
        t.description,
        t.status,
        t.created_by,
        t.user_id,
        t.difficulty,
        t.date_created,
        t.date_completed,
        t.recurring,
        t.steps
      FROM task t
      WHERE id = $1;
      `,
      [id],
    );
    return new Task(res.rows[0]);
  }

  async getAll(): Promise<Task[]> {
    const res = await this.pool.query(`SELECT * FROM task`);
    return res.rows.map(row => new Task(row));
  }

  async filterAll(filters: { status: TaskStatus }): Promise<Task[]> {
    const res = await this.pool.query(
      `
      SELECT *
      FROM task
      WHERE status = $1
    `,
      [filters.status],
    );
    return res.rows.map(row => new Task(row));
  }

  async save(task: Task): Promise<Task> {
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
        steps
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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
      ],
    );
    return new Task(res.rows[0]);
  }

  async delete(id: TaskId): Promise<number> {
    const res = await this.pool.query(`DELETE FROM task WHERE id = $1`, [id]);
    return res.rowCount;
  }

  async update(taskOpts, taskId: TaskId): Promise<Task> {
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
      console.log(err);
      throw `Could not update Task (${err})`;
    } finally {
      client.release();
    }
  }
}
