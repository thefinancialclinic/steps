import { Repository } from "./Repository";
import { TaskId } from "./TaskRepository";
import { UserId } from "./UserRepository";
import { Pool, Client } from "pg";

export type RequestId = number;
export type RequestStatus = "NEEDS_ASSISTANCE" | "REPLIED" | "RESOLVED";

export type RequestOpts = {
  id?: RequestId;
  status?: RequestStatus;
  user_id: UserId;
  task_id: TaskId;
};

export class RequestItem {
  id?: RequestId;
  status?: RequestStatus;
  user_id: UserId;
  task_id: TaskId;

  constructor(opts: RequestOpts) {
    this.id = opts.id;
    this.status = opts.status;
    this.user_id = opts.user_id;
    this.task_id = opts.task_id;
  }
}

export class RequestRepository implements Repository<RequestId, RequestItem> {
  constructor(public pool: Pool) { }

  async getOne(id: RequestId) {
    const res = await this.pool.query(`SELECT * FROM request WHERE id = $1`, [
      id
    ]);
    return new RequestItem(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM request`);
    return res.rows.map(row => new RequestItem(row));
  }

  async save(request: RequestItem): Promise<RequestItem> {
    const res = await this.pool.query(
      `
      INSERT INTO request (status, user_id, task_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [request.status, request.user_id, request.task_id]
    );
    return new RequestItem(res.rows[0]);
  }

  async delete(id: RequestId) {
    const res = await this.pool.query(`DELETE FROM request WHERE id = $1`, [
      id
    ]);
    return res.rowCount;
  }

  async update(request: RequestItem): Promise<RequestItem> {
    const res = await this.pool.query(
      `
      UPDATE request SET (status, user_id, task_id)
      = ($1, $2, $3)
      WHERE id = $4
      RETURNING *
    `,
      [request.status, request.user_id, request.task_id, request.id]
    );
    return new RequestItem(res.rows[0]);
  }
}
