import { Repository } from "./Repository";
import { Pool, Client } from "pg";

export type OrgId = number;

export type OrgOpts = {
  id?: OrgId;
  name: string;
  sms_number: string;
  logo?: string;
};

export class Org {
  id?: number;
  name: string;
  sms_number: string;
  logo?: string;

  constructor(opts: OrgOpts) {
    this.id = opts.id;
    this.name = opts.name;
    this.sms_number = opts.sms_number;
    this.logo = opts.logo;
  }
}

export class OrgRepository implements Repository<OrgId, Org> {
  constructor(public pool: Pool) { }

  async getOne(oid: OrgId) {
    const res = await this.pool.query(`SELECT * FROM org WHERE id = $1`, [
      oid
    ]);
    return new Org(res.rows[0]);
  }

  async getAll() {
    const res = await this.pool.query(`SELECT * FROM org`);
    return res.rows.map(row => new Org(row));
  }

  async save(org: Org): Promise<Org> {
    const res = await this.pool.query(
      `
      INSERT INTO org (name, sms_number, logo)
      VALUES ($1, $2, $3)
      RETURNING *
    `,
      [org.name, org.sms_number, org.logo]
    );
    return new Org(res.rows[0]);
  }

  async delete(oid: OrgId) {
    const res = await this.pool.query(`DELETE FROM org WHERE id = $1`, [oid]);
    return res.rowCount;
  }

  async update(org: Org): Promise<Org> {
    const res = await this.pool.query(
      `
      UPDATE org SET (name, sms_number, logo)
      = ($1, $2, $3)
      WHERE id = $4
      RETURNING *
      `,
      [org.name, org.sms_number, org.logo, org.id]
    );
    return new Org(res.rows[0]);
  }

  // TEMPORARY: Seeding DB
  async seed() {
    await this.pool.query(`
      INSERT INTO org (id, name, sms_number)
      VALUES (1, 'Org', '555-5555')
      ON CONFLICT (id) DO NOTHING;
    `);

    // advance the auto-incrementing sequence by one. This avoids the
    // problem that the next (very first!) Org to be added will clash
    // with the existing seeded value.
    await this.pool.query(`SELECT nextval('org_id_seq');`);
  }
}
