import { Repository } from './Repository';
import { Pool } from 'pg';
import { Task } from './TaskRepository';
import { Message } from './MessageRepository';
import { Media, MediaId } from './MediaRepository';
import { RequestItem } from './RequestRepository';
import { placeholders } from '../util';

export type UserId = number;
export type UserType = 'Client' | 'Coach' | 'Admin' | 'Superadmin';
export type UserPlatform = 'SMS' | 'FBOOK';
export type UserStatus = 'AWAITING_HELP' | 'WORKING' | 'NON_RESPONSIVE';
export type ViewedMedia = { id: number; client_id: UserId; media_id: MediaId };

export type ObjectType = {
  [key: string]: string | number | boolean | ObjectType;
};

export type Checkin = {
  topic: string;
  message: string;
  time: Date;
};

export class User {
  id?: UserId;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  coach_id?: number;
  org_id: number;
  color: string;
  goals: string[];
  status: string;
  type: string;
  updated?: Date;
  platform?: UserPlatform;
  image?: string | null;
  follow_up_date?: Date;
  plan_url?: string;
  checkin_times?: Checkin[];
  topic?: string;
  fb_id?: string;
  temp_help_response?: string;
  auth0_id?: string;

  constructor(opts: Partial<User>) {
    this.id = opts.id;
    this.first_name = opts.first_name;
    this.last_name = opts.last_name;
    this.email = opts.email;
    this.phone = opts.phone;
    this.coach_id = opts.coach_id;
    this.org_id = opts.org_id;
    this.color = opts.color;
    this.goals = opts.goals;
    this.status = opts.status;
    this.type = opts.type;
    this.updated = opts.updated;
    this.platform = opts.platform;
    this.image = opts.image;
    this.follow_up_date = opts.follow_up_date;
    this.plan_url = opts.plan_url;
    this.checkin_times = opts.checkin_times;
    this.topic = opts.topic;
    this.fb_id = opts.fb_id;
    this.temp_help_response = opts.temp_help_response;
    this.auth0_id = opts.auth0_id;
  }
}

export class UserRepository implements Repository<UserId, User> {
  constructor(public pool: Pool) {}

  async getClientByEmail(email: string) {
    const res = await this.pool.query(
      `SELECT * FROM "user"
      WHERE type = 'Client'
      AND auth0_id is null
      AND email = $1;`,
      [email],
    );
    if (res.rowCount > 0) {
      return new User(res.rows[0]);
    } else {
      return null;
    }
  }

  async getByAuth0Id(auth0Id: string) {
    const res = await this.pool.query(
      `SELECT * FROM "user" WHERE auth0_id = $1`,
      [auth0Id],
    );
    if (res.rowCount > 0) {
      return new User(res.rows[0]);
    } else {
      return null;
    }
  }

  async save(user: Partial<User>): Promise<User> {
    try {
      const res = await this.pool.query(
        `
        INSERT INTO "user" (
          first_name,
          last_name,
          email,
          phone,
          coach_id,
          org_id,
          color,
          goals,
          status,
          type,
          updated,
          platform,
          image,
          follow_up_date,
          plan_url,
          checkin_times,
          topic,
          fb_id,
          temp_help_response,
          auth0_id
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20)
        RETURNING *
      `,
        [
          user.first_name,
          user.last_name,
          user.email,
          user.phone,
          user.coach_id,
          user.org_id,
          user.color,
          user.goals,
          user.status,
          user.type,
          user.updated,
          user.platform,
          user.image,
          user.follow_up_date,
          user.plan_url,
          user.checkin_times,
          user.topic,
          user.fb_id,
          user.temp_help_response,
          user.auth0_id,
        ],
      );
      return new User(res.rows[0]);
    } catch (err) {
      throw `Could not create user (${err})`;
    }
  }

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM "user" WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      const res = await this.pool.query(q);
      return res.rows.map(user => new User(user));
    } catch (err) {
      throw `Could not query Users (${err})`;
    } finally {
      client.release();
    }
  }

  async getOne(uid: UserId) {
    let result;
    try {
      result = await this.get({ id: uid });
      return result[0];
    } catch (err) {
      throw `Could not get User (${err})`;
    }
  }

  async getAll() {
    return this.get({});
  }

  async update(userOpts: Partial<User>, conditions = {}): Promise<User> {
    if (Object.keys(userOpts).length === 0) {
      if (conditions['id']) {
        return (await this.get({ id: conditions['id'] }))[0];
      } else {
        throw 'Cannot update User, "id" is missing.';
      }
    }
    const client = await this.pool.connect();
    const rawColumns = Object.keys(userOpts);
    const columns = rawColumns.map(col => client.escapeIdentifier(col));
    const values = rawColumns.map(col => userOpts[col]);
    const valPlaceholders = placeholders(1, values.length);
    try {
      let q: string = `
        UPDATE "user" SET (${columns.join(', ')}) = ROW(${valPlaceholders})
        WHERE 1 = 1
      `;
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      q = q + ' RETURNING *';
      const res = await client.query(q, values);
      return new User(res.rows[0]);
    } catch (err) {
      throw `Could not update User (${err})`;
    } finally {
      client.release();
    }
  }

  async delete(uid: UserId): Promise<number> {
    const res = await this.pool.query(`DELETE FROM "user" WHERE id = $1`, [
      uid,
    ]);
    return res.rowCount;
  }

  //////////////////////////////////////////////////////////////////////////////
  // Parameterized (CRUD)

  // Get all users but restrict the query based on the given conditions:
  //   an argument of: {type: 'Client'}
  //   runs the query: SELECT * FROM "user" WHERE 1=1 AND type = 'Client'

  // Parameterized
  async getAllByType(type: UserType): Promise<User[]> {
    const res = await this.pool.query(`SELECT * FROM "user" WHERE type = $1`, [
      type,
    ]);
    return res.rows.map(row => new User(row));
  }
  async getOneByType(uid: UserId, type: UserType): Promise<User> {
    const res = await this.pool.query(
      `SELECT * FROM "user" WHERE id = $1 AND type = $2`,
      [uid, type],
    );
    return new User(res.rows[0]);
  }

  async saveByType(user: User, type: UserType): Promise<User> {
    user.type = type;
    return this.save(user);
  }

  async deleteByType(uid: UserId, type: UserType): Promise<number> {
    const res = await this.pool.query(
      `DELETE FROM "user" WHERE id = $1 AND type = $2`,
      [uid, type],
    );
    return res.rowCount;
  }

  // TEMPORARY: Seeding DB
  async seed() {
    const idToken = process.env.AUTH0_SUPERADMIN_ID;
    await this.pool.query(
      `
      INSERT INTO "user" (id, first_name, last_name, email, org_id, color, status, "type", auth0_id)
      VALUES (1, 'Super', 'Admin', 'superadmin@example.com', 1, 'blue', 'WORKING', 'Superadmin', $1)
      ON CONFLICT (id) DO NOTHING;
    `,
      [idToken],
    );

    // advance the auto-incrementing sequence by one. This avoids the
    // problem that the next (very first!) User to be added will clash
    // with the existing seeded value.
    await this.pool.query(`SELECT nextval('user_id_seq');`);
  }

  async tasks(clientId: UserId): Promise<Task[]> {
    const res = await this.pool.query(
      `
      SELECT task.*
      FROM task
      JOIN "user" usr ON task.user_id = usr.id
      WHERE usr.id = $1
      AND   usr.type = 'Client'
      ORDER BY "order"
      `,
      [clientId],
    );
    return res.rows.map(row => new Task(row));
  }

  async messages(clientId: UserId): Promise<Message[]> {
    const res = await this.pool.query(
      `
      SELECT
        msg.id,
        msg.text,
        msg.to_user,
        msg.from_user,
        msg.media_id,
        msg.request_id,
        msg.timestamp,
        msg.responses
      FROM message msg
      JOIN "user" usr ON (usr.id = msg.from_user OR usr.id = msg.to_user)
      WHERE usr.id = $1
      AND usr.type = 'Client'
    `,
      [clientId],
    );
    return res.rows.map(row => new Message(row));
  }

  async viewed_media(clientId: UserId): Promise<Media[]> {
    const res = await this.pool.query(
      `
      SELECT
        media.id,
        media.task_id,
        media.title,
        media.category,
        media.description,
        media.url,
        media.image,
        media.published_by,
        media.type
      FROM media
      JOIN viewed_media vm ON media.id = vm.media_id
      JOIN "user" usr ON usr.id = vm.client_id
      WHERE usr.id = $1
      AND usr.type = 'Client'
      `,
      [clientId],
    );
    return res.rows.map(row => new Media(row));
  }

  async create_viewed_media(
    clientId: UserId,
    mediaId: MediaId,
  ): Promise<ViewedMedia> {
    const res = await this.pool.query(
      `
      INSERT INTO viewed_media (client_id, media_id)
      VALUES ($1, $2)
      RETURNING *
      `,
      [clientId, mediaId],
    );
    return res.rows[0];
  }

  async delete_viewed_media(
    clientId: UserId,
    mediaId: MediaId,
  ): Promise<number> {
    const res = await this.pool.query(
      `
      DELETE FROM viewed_media
      WHERE client_id = $1 AND media_id = $2;
      `,
      [clientId, mediaId],
    );
    return res.rowCount;
  }

  async requests(clientId: UserId): Promise<RequestItem[]> {
    const res = await this.pool.query(
      `
      SELECT
        r.id,
        r.status,
        r.user_id,
        r.task_id
      FROM request r
      JOIN "user" usr ON usr.id = r.user_id
      AND usr.type = 'Client'
      AND usr.id = $1;
      `,
      [clientId],
    );
    return res.rows.map(row => new RequestItem(row));
  }
}
