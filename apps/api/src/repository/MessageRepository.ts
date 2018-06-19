import { Repository } from './Repository';
import { Pool, Client } from 'pg';
import { MediaId } from './MediaRepository';
import { UserId, User } from './UserRepository';
import { RequestId } from './RequestRepository';
import { OrgId } from './OrgRepository';

export type MessageId = number;
export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

export type MessageOpts = {
  id?: MessageId;
  text: string;
  to_user: UserId;
  from_user: UserId;
  media_id?: MediaId;
  request_id?: RequestId;
  timestamp: Date;
  responses?: ObjectType;
};

export class Message {
  id: MessageId;
  text: string;
  to_user: UserId;
  from_user: UserId;
  media_id?: MediaId;
  request_id?: RequestId;
  timestamp: Date;
  responses?: ObjectType;

  constructor(opts: MessageOpts) {
    this.id = opts.id;
    this.text = opts.text;
    this.to_user = opts.to_user;
    this.from_user = opts.from_user;
    this.media_id = opts.media_id;
    this.request_id = opts.request_id;
    this.timestamp = opts.timestamp;
    this.responses = opts.responses;
  }
}

export class MessageRepository implements Repository<MessageId, Message> {
  constructor(public pool: Pool) {}

  async getOne(id: MessageId): Promise<Message> {
    const res = await this.pool.query(
      `SELECT * FROM public.message WHERE id = $1`,
      [id],
    );
    return new Message(res.rows[0]);
  }

  async getAll(): Promise<Message[]> {
    const res = await this.pool.query(`SELECT * FROM public.message`);
    return res.rows.map(row => new Message(row));
  }

  async save(msg: Message): Promise<Message> {
    const res = await this.pool.query(
      `
      INSERT INTO public.message (
        text,
        to_user,
        from_user,
        media_id,
        request_id,
        timestamp,
        responses
      ) VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `,
      [
        msg.text,
        msg.to_user,
        msg.from_user,
        msg.media_id,
        msg.request_id,
        msg.timestamp,
        msg.responses,
      ],
    );
    return new Message(res.rows[0]);
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
      const res = await this.pool.query(q);
      return res.rows.map(user => new Message(user));
    } catch (err) {
      throw `Could not query Tasks (${err})`;
    } finally {
      client.release();
    }
  }

  async delete(id: MessageId): Promise<number> {
    const res = await this.pool.query(
      `DELETE FROM public.message WHERE id = $1`,
      [id],
    );
    return res.rowCount;
  }

  async update(msg: Message): Promise<Message> {
    const res = await this.pool.query(
      `
      UPDATE public.message SET (
        text,
        to_user,
        from_user,
        media_id,
        request_id,
        timestamp,
        responses
      ) = ($1, $2, $3, $4, $5, $6, $7)
      WHERE id = $8
      RETURNING *
    `,
      [
        msg.text,
        msg.to_user,
        msg.from_user,
        msg.media_id,
        msg.request_id,
        msg.timestamp,
        msg.responses,
        msg.id,
      ],
    );
    return new Message(res.rows[0]);
  }

  // Select the two users involved in this message (to and from)
  async participants(msgId: MessageId): Promise<User[]> {
    if (!msgId) {
      throw `You must provide a messageId to determine participants`;
    }
    try {
      const res = await this.pool.query(
        `
        SELECT usr.*
        FROM message msg
        JOIN "user" usr ON (usr.id = msg.to_user OR usr.id = msg.from_user)
        WHERE msg.id = $1
        ORDER BY usr.type
        LIMIT 2
        `,
        [msgId],
      );
      return res.rows.map(row => new User(row));
    } catch (err) {
      throw `Could not determine users attached to this message (${err})`;
    }
  }

  // Select the coach involved in the message (if any)
  async coach(msgId: MessageId): Promise<User[]> {
    if (!msgId) {
      throw `You must provide a messageId to determine Message coach`;
    }
    try {
      const res = await this.pool.query(
        `
        SELECT usr.*
        FROM message msg
        JOIN "user" usr ON (usr.id = msg.from_user OR usr.id = msg.to_user)
        WHERE msg.id = $1
        AND usr.type = 'Coach'        
        `,
        [msgId],
      );
      return res.rows.map(row => new User(row));
    } catch (err) {
      throw `Could not determine users attached to this message (${err})`;
    }
  }
}
