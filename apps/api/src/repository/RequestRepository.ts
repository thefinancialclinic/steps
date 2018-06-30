import { Repository } from './Repository';
import { TaskId } from './TaskRepository';
import { UserId } from './UserRepository';
import { Pool, Client } from 'pg';

export type RequestId = number;
export type RequestStatus = 'NEEDS_ASSISTANCE' | 'REPLIED' | 'RESOLVED';

export class RequestItem {
  id?: RequestId;
  status?: RequestStatus;
  user_id: UserId;
  task_id: TaskId;
  created_at?: Date;

  constructor(opts: Partial<RequestItem>) {
    this.id = opts.id;
    this.status = opts.status;
    this.user_id = opts.user_id;
    this.task_id = opts.task_id;
    this.created_at = opts.created_at;
  }
}

export class RequestRepository implements Repository<RequestId, RequestItem> {
  constructor(public pool: Pool) {}

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
      const res = await this.pool.query(q);
      return res.rows.map(user => new RequestItem(user));
    } catch (err) {
      throw `Could not query Tasks (${err})`;
    } finally {
      client.release();
    }
  }

  async getOne(id: RequestId) {
    const res = await this.pool.query(`SELECT * FROM request WHERE id = $1`, [
      id,
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
      [request.status, request.user_id, request.task_id],
    );
    return new RequestItem(res.rows[0]);
  }

  async delete(id: RequestId) {
    const res = await this.pool.query(`DELETE FROM request WHERE id = $1`, [
      id,
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
      [request.status, request.user_id, request.task_id, request.id],
    );
    return new RequestItem(res.rows[0]);
  }
}
