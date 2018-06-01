import { Repository } from "./Repository";
import { Pool, Client } from "pg";
import { Step } from "./StepRepository";

export type TaskId = number;
export type TaskStatus = "ACTIVE" | "COMPLETED" | "ARCHIVED";
export type TaskDifficulty = "EASY" | "MODERATE" | "DIFFICULT";

// Collection of string key-value pairs
export type Object = { [key: string]: any };

export type TaskOpts = {
  id?: number,
  title: string,
  category: string,
  description?: string,
  status?: TaskStatus,
  created_by?: number,
  user_id?: number,
  difficulty?: TaskDifficulty,
  date_created: Date,
  date_completed?: Date,
  recurring?: Object,
  steps?: Step[],
};

export class Task {
  id: number;
  title: string;
  category: string;
  description?: string;
  status?: TaskStatus;
  created_by?: number;
  user_id?: number;
  difficulty?: TaskDifficulty;
  date_created: Date;
  date_completed?: Date;
  recurring?: Object;
  steps?: Step[];

  constructor(opts: TaskOpts) {
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
  constructor(public pool: Pool) { }

  async getOne(id: TaskId) {
    // Return a single Task along with the all the steps that belong to it.
    const res = await this.pool.query(`
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
        ARRAY(
          SELECT json_build_object(
            'id', s.id,
            'text', s.text,
            'note', s.note,
            'task_id', s.task_id)
          FROM step s
          WHERE s.task_id = $1
        ) as "steps"
      FROM task t
      WHERE id = $1;
      `,
      [id]
    );
    return new Task(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM task`);
    return res.rows.map(row => new Task(row));
  }

  async save(task: Task) {
    const res = await this.pool.query(
      `
      INSERT INTO  task (
        title,
        category,
        description,
        status,
        created_by,
        user_id,
        difficulty,
        date_created,
        date_completed,
        recurring
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      RETURNING id
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
      ]
    );
    return res.rows[0].id as TaskId;
  }

  async delete(id: TaskId) {
    const res = await this.pool.query(`DELETE FROM task WHERE id = $1`, [id]);
    return res.rowCount;
  }
}
