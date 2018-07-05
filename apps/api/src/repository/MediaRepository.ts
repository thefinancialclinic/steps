import { Repository } from './Repository';
import { Pool, Client } from 'pg';
import { User, UserId } from './UserRepository';
import { TaskId } from './TaskRepository';

export type MediaId = number;
export type MediaType =
  | 'TASK_CONTENT'
  | 'TASK_RESOURCE'
  | 'STORY'
  | 'GENERAL_EDUCATION';

export class Media {
  id?: MediaId;
  task_id?: number;
  title: string;
  category: string;
  description?: string;
  url?: string;
  image?: string;
  published_by?: number;
  type?: MediaType;

  constructor(opts: Partial<Media>) {
    this.id = opts.id;
    this.task_id = opts.task_id;
    this.title = opts.title;
    this.category = opts.category;
    this.description = opts.description;
    this.url = opts.url;
    this.image = opts.image;
    this.published_by = opts.published_by;
    this.type = opts.type;
  }
}

export class MediaRepository implements Repository<MediaId, Media> {
  constructor(public pool: Pool) {}

  async get(conditions = {}) {
    let client;
    try {
      client = await this.pool.connect();
      let q = 'SELECT * FROM media WHERE 1 = 1';
      let val;
      Object.keys(conditions).forEach(label => {
        val = conditions[label];
        val = typeof val === 'string' ? client.escapeLiteral(val) : val;
        q = q + ` AND ${client.escapeIdentifier(label)} = ${val}`;
      });
      const res = await this.pool.query(q);
      return res.rows.map(media => new Media(media));
    } catch (err) {
      throw `Could not query Media (${err})`;
    } finally {
      client.release();
    }
  }

  async getAll(): Promise<Media[]> {
    const res = await this.pool.query(`SELECT * FROM media`);
    return res.rows.map(row => new Media(row));
  }

  // Get all media of all tasks assigned to userId
  async byOwner(userId: UserId, mediaId?: TaskId): Promise<Media[]> {
    try {
      let res;
      let q = `
        SELECT media.*
        FROM media
        JOIN task ON task.id = media.task_id
        JOIN "user" usr ON usr.id = task.user_id
        WHERE usr.id = $1
      `;
      if (mediaId) {
        q = q + ' AND media.id = $2';
        res = await this.pool.query(q, [userId, mediaId]);
      } else {
        res = await this.pool.query(q, [userId]);
      }
      return res.rows.map(row => new Media(row));
    } catch (err) {
      throw `Could not query media belonging to user (${err})`;
    }
  }

  async save(media: Media): Promise<Media> {
    const res = await this.pool.query(
      `
      INSERT INTO  media (
        task_id,
        title,
        category,
        description,
        url,
        image,
        published_by,
        type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `,
      [
        media.task_id,
        media.title,
        media.category,
        media.description,
        media.url,
        media.image,
        media.published_by,
        media.type,
      ],
    );
    return new Media(res.rows[0]);
  }

  async delete(id: MediaId): Promise<number> {
    const res = await this.pool.query(`DELETE FROM media WHERE id = $1`, [id]);
    return res.rowCount;
  }

  async update(media: Media): Promise<Media> {
    const res = await this.pool.query(
      `
      UPDATE media SET (
        task_id,
        title,
        category,
        description,
        url,
        image,
        published_by,
        type
      ) = ($1, $2, $3, $4, $5, $6, $7, $8)
      WHERE id = $10
      RETURNING *
      `,
      [
        media.task_id,
        media.title,
        media.category,
        media.description,
        media.url,
        media.image,
        media.published_by,
        media.type,
        media.id,
      ],
    );
    return new Media(res.rows[0]);
  }

  async owner(mediaId: MediaId): Promise<User[]> {
    try {
      const res = await this.pool.query(
        `
        SELECT usr.*
        FROM media
        JOIN task ON task.id = media.task_id
        JOIN "user" usr ON usr.id = task.user_id
        WHERE media.id = $1
        AND usr.type = 'Client';`,
        [mediaId],
      );
      return res.rows.map(user => new User(user));
    } catch (err) {
      throw `Could not determine owner of media (${err})`;
    }
  }
}
