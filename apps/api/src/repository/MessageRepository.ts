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

export class Message {
  id: MessageId;
  text: string;
  to_user: UserId;
  from_user: UserId;
  media_id?: MediaId;
  request_id?: RequestId;
  timestamp: Date;
  responses?: ObjectType;
  topic?: string;

  constructor(opts: Partial<Message>) {
    this.id = opts.id;
    this.text = opts.text;
    this.to_user = opts.to_user;
    this.from_user = opts.from_user;
    this.media_id = opts.media_id;
    this.request_id = opts.request_id;
    this.timestamp = opts.timestamp;
    this.responses = opts.responses;
    this.topic = opts.topic;
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
    try {
      const res = await this.pool.query(
        `
        INSERT INTO public.message (
          text,
          to_user,
          from_user,
          media_id,
          request_id,
          timestamp,
          responses,
          topic
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
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
          msg.topic,
        ],
      );
      return new Message(res.rows[0]);
    } catch (err) {
      throw `Could not create message (${err})`;
    }
  }

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM message WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      const res = await this.pool.query(q);
      return res.rows.map(user => new Message(user));
    } catch (err) {
      throw `Could not query Messages (${err})`;
    } finally {
      if (client) client.release();
    }
  }

  async getAllMessagesForOrg(orgId: OrgId): Promise<Message[]> {
    try {
      const res = await this.pool.query(
        `
        SELECT msg.*
        FROM message msg
        JOIN "user" from_user ON from_user.id = msg.from_user
        JOIN "user" to_user ON to_user.id = msg.to_user
        JOIN org ON org.id = from_user.org_id
        WHERE from_user.org_id = to_user.org_id
        AND org.id = $1

        `,
        [orgId],
      );
      return res.rows.map(row => new Message(row));
    } catch (err) {
      throw `Could not get Messages for org, ${orgId} (${err})`;
    }
  }

  async getAllMessagesForUser(userId: UserId): Promise<Message[]> {
    try {
      const res = await this.pool.query(
        `
        SELECT msg.*
        FROM message msg
        JOIN "user" usr1 ON usr1.id = msg.from_user
        JOIN "user" usr2 ON usr2.id = msg.to_user
        WHERE usr1.id <> usr2.id
        AND (usr1.id = $1 OR usr2.id = $1)
        `,
        [userId],
      );
      return res.rows.map(row => new Message(row));
    } catch (err) {
      throw `Could not get Messages for org, ${userId} (${err})`;
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
