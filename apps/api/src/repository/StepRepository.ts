import { Repository } from "./Repository";
import { Pool, Client } from "pg";

export type StepId = number;

export type StepOpts = {
  id?: StepId;
  text: string;
  note?: string;
  task_id: number;
};

export class Step {
  id?: StepId;
  text: string;
  note?: string;
  task_id: number;

  constructor(opts: StepOpts) {
    this.id = opts.id;
    this.text = opts.text;
    this.note = opts.note;
    this.task_id = opts.task_id;
  }
}

export class StepRepository implements Repository<StepId, Step> {
  constructor(public pool: Pool) { }

  async getOne(id: StepId) {
    const res = await this.pool.query(`SELECT * FROM step WHERE id = $1`, [
      id
    ]);
    return new Step(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM step`);
    return res.rows.map(row => new Step(row));
  }

  async save(step: Step) {
    const res = await this.pool.query(
      `
      INSERT INTO step (text, note, task_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
      [
        step.text,
        step.note,
        step.task_id,
      ]
    );
    return res.rows[0].id as StepId;
  }

  async delete(id: StepId) {
    const res = await this.pool.query(`DELETE FROM step WHERE id = $1`, [id]);
    return res.rowCount;
  }
}
