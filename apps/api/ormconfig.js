const isProduction = process.env.NODE_ENV === 'production';

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

const productionOptions = () => {
  const PostgressConnectionStringParser = require('pg-connection-string');
  const connectionOptions = PostgressConnectionStringParser.parse(process.env.DATABASE_URL);

  return {
    host: connectionOptions.host,
    port: connectionOptions.port || 5432,
    username: connectionOptions.user,
    password: connectionOptions.password,
    database: connectionOptions.database,
    entities: [".build/entity/**/*.js"],
    migrations: [".build/migration/**/*.js"],
    subscribers: [".build/subscriber/**/*.js"]
  };
}

const developmentOptions = () => ({
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: '',
  database: 'steps_admin_test',
});

module.exports = Object.assign({},
  baseOptions,
  isProduction && productionOptions(),
  !isProduction && developmentOptions(),
);
