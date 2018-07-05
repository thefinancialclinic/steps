/// Initialize the database, provide 'pool' to other modules
import { Pool } from 'pg';
import * as url from 'url';

import { OrgRepository } from './repository/OrgRepository';
import { UserRepository } from './repository/UserRepository';

require('dotenv').config({ path: '../../.env' });

const localConnString = 'postgres://postgres@localhost:5432/steps_admin_test';
const databaseUrl = process.env.DATABASE_URL || localConnString;
const connUrl = url.parse(databaseUrl);

const pool = new Pool({
  user: connUrl.auth.split(':')[0],
  password: connUrl.auth.split(':')[1],
  host: connUrl.hostname,
  database: connUrl.pathname.slice(1), // drop leading slash
  port: parseInt(connUrl.port),
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// TEMPORARY: Seed Org (id: 1) and Coach (id: 1) needed for Client creation
new OrgRepository(pool).seed();
const userRepo = new UserRepository(pool);
userRepo.seed();

export { pool };
export { databaseUrl };
