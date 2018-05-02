const baseOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'steps_admin_test',
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
  entities: [".build/entity/**/*.js"],
  migrations: [".build/migration/**/*.js"],
  subscribers: [".build/subscriber/**/*.js"]
};

module.exports = Object.assign({},
  baseOptions,
  process.env.NODE_ENV === 'production' && productionOptions,
);
