import { Repository } from "./Repository";
import { Pool, Client } from "pg";

export type MediaId = number;
export type MediaType =
  | "TASK_CONTENT"
  | "TASK_RESOURCE"
  | "STORY"
  | "GENERAL_EDUCATION";

export type MediaOpts = {
  id?: MediaId;
  step_id?: number;
  task_id?: number;
  title: string;
  category: string;
  description?: string;
  url?: string;
  image?: string;
  published_by?: number;
  type?: MediaType;
};

export class Media {
  id?: MediaId;
  step_id?: number;
  task_id?: number;
  title: string;
  category: string;
  description?: string;
  url?: string;
  image?: string;
  published_by?: number;
  type?: MediaType;

  constructor(opts: MediaOpts) {
    this.id = opts.id;
    this.step_id = opts.step_id;
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
  constructor(public pool: Pool) { }

  async getOne(id: MediaId) {
    const res = await this.pool.query(`SELECT * FROM media WHERE id = $1`, [
      id
    ]);
    return new Media(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM media`);
    return res.rows.map(row => new Media(row));
  }

  async save(media: Media) {
    const res = await this.pool.query(
      `
      INSERT INTO  media (
        step_id,
        task_id,
        title,
        category,
        description,
        url,
        image,
        published_by,
        type
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING id
    `,
      [
        media.step_id,
        media.task_id,
        media.title,
        media.category,
        media.description,
        media.url,
        media.image,
        media.published_by,
        media.type
      ]
    );
    return res.rows[0].id as MediaId;
  }

  async delete(id: MediaId) {
    const res = await this.pool.query(`DELETE FROM media WHERE id = $1`, [id]);
    return res.rowCount;
  }
}