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

export class Request {
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

export class RequestRepository implements Repository<RequestId, Request> {
  constructor(public pool: Pool) { }

  async getOne(id: RequestId) {
    const res = await this.pool.query(`SELECT * FROM request WHERE id = $1`, [
      id
    ]);
    return new Request(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM request`);
    return res.rows.map(row => new Request(row));
  }

  async save(request: Request) {
    const res = await this.pool.query(
      `
      INSERT INTO request (status, user_id, task_id)
      VALUES ($1, $2, $3)
      RETURNING id
    `,
      [request.status, request.user_id, request.task_id]
    );
    return res.rows[0].id as RequestId;
  }

  async delete(id: RequestId) {
    const res = await this.pool.query(`DELETE FROM request WHERE id = $1`, [
      id
    ]);
    return res.rowCount;
  }
}
