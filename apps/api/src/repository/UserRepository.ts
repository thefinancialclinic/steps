import { Repository } from "./Repository";
import { OrgId } from "./OrgRepository";
import { Pool, Client } from "pg";

export type UserId = number;
export type UserType = "Client" | "Coach" | "Admin" | "Superadmin";
export type UserPlatform = "SMS" | "FBOOK";
export type UserStatus = "AWAITING_HELP" | "WORKING" | "NON_RESPONSIVE";

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
};

export class User {
  id?: UserId;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  coach_id: number | null;
  org_id: number;
  color: string;
  goals: string[] | null;
  status: string;
  type: string;
  updated: Date;
  platform: UserPlatform;
  image: string | null;
  follow_up_date: Date;

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
  }
}

export class UserRepository implements Repository<UserId, User> {
  constructor(public pool: Pool) {}

  async getOne(uid: UserId) {
    const res = await this.pool.query(`SELECT * FROM "user" WHERE id = $1`, [
      uid
    ]);
    return new User(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM "user"`);
    return res.rows.map(row => new User(row));
  }

  async save(user: User) {
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
        follow_up_date
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
      RETURNING id
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
        user.follow_up_date
      ]
    );
    return res.rows[0].id as UserId;
  }

  async delete(uid: UserId) {
    const res = await this.pool.query(`DELETE FROM "user" WHERE id = $1`, [
      uid
    ]);
    return res.rowCount;
  }

  // Parameterized
  async getAllByType(type: UserType) {
    const res = await this.pool.query(`SELECT * FROM "user" WHERE type = $1`, [
      type
    ]);
    return res.rows.map(row => new User(row));
  }
  async getOneByType(uid: UserId, type: UserType) {
    const res = await this.pool.query(
      `SELECT * FROM "user" WHERE id = $1 AND type = $2`,
      [uid, type]
    );
    return new User(res.rows[0]);
  }

  async saveByType(user: User, type: UserType) {
    user.type = type;
    return this.save(user);
  }

  async deleteByType(uid: UserId, type: UserType) {
    const res = await this.pool.query(
      `DELETE FROM "user" WHERE id = $1 AND type = $2`,
      [uid, type]
    );
    return res.rowCount;
  }
}
