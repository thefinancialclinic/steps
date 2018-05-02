const baseOptions = {
  type: 'postgres',
  synchronize: false,
  logging: false,
  migrationsTableName: 'migrations',
  entities: ["src/entity/**/*.ts"],
  migrations: ["src/migration/**/*.ts"],
  subscribers: ["src/subscriber/**/*.ts"],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};

const productionOptions = {
  host: process.env.DATABASE_URL || 'localhost',
  entities: [".build/entity/**/*.js"],
  migrations: [".build/migration/**/*.js"],
  subscribers: [".build/subscriber/**/*.js"]
};

const developmentOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'steps_admin_test',
}

module.exports = Object.assign({},
  baseOptions,
  process.env.NODE_ENV === 'production' && productionOptions,
  process.env.NODE_ENV !== 'production' && developmentOptions,
);
