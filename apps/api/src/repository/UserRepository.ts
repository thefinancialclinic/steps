import { Repository } from './Repository';
import { OrgId } from './OrgRepository';
import { Pool, Client } from 'pg';
import { Task } from './TaskRepository';
import { Message } from './MessageRepository';
import { Media, MediaId } from './MediaRepository';
import { RequestItem } from './RequestRepository';

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

export type UserOpts = {
  id?: UserId;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  coach_id?: UserId;
  org_id: OrgId;
  color: string;
  goals?: string[];
  status: UserStatus;
  type: UserType;
  updated?: Date;
  platform?: UserPlatform;
  image?: string;
  follow_up_date?: Date;
  plan_url?: string;
  checkin_times?: Checkin[];
  topic?: string;
  fb_id?: string;
  temp_help_response?: string;
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

  constructor(opts: UserOpts) {
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
  }
}

export class UserRepository implements Repository<UserId, User> {
  constructor(public pool: Pool) {}

  async getOne(uid: UserId) {
    const res = await this.pool.query(`SELECT * FROM "user" WHERE id = $1`, [
      uid,
    ]);
    return new User(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM "user"`);
    return res.rows.map(row => new User(row));
  }

  async save(user: User): Promise<User> {
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
        temp_help_response
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
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
      ],
    );
    return new User(res.rows[0]);
  }

  async update(user: User): Promise<User> {
    const res = await this.pool.query(
      `
      UPDATE "user" SET (
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
        temp_help_response
      ) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
      WHERE id = $20
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
        user.id,
      ],
    );
    return new User(res.rows[0]);
  }

  async delete(uid: UserId): Promise<number> {
    const res = await this.pool.query(`DELETE FROM "user" WHERE id = $1`, [
      uid,
    ]);
    return res.rowCount;
  }

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
    await this.pool.query(`
      INSERT INTO "user" (id, first_name, last_name, email, org_id, color, status, "type")
      VALUES (1, 'First', 'Last', 'coach@example.com', 1, 'blue', 'WORKING', 'Coach')
      ON CONFLICT (id) DO NOTHING;
    `);

    // advance the auto-incrementing sequence by one. This avoids the
    // problem that the next (very first!) User to be added will clash
    // with the existing seeded value.
    await this.pool.query(`SELECT nextval('user_id_seq');`);
  }

  async tasks(clientId: UserId): Promise<Task[]> {
    const res = await this.pool.query(
      `
      SELECT
        task.id,
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
        task.steps
      FROM task
      JOIN "user" usr ON task.user_id = usr.id
      WHERE usr.id = $1
      AND   usr.type = 'Client'`,
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
