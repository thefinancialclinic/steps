import { Client } from 'pg';

const isProduction = process.env.NODE_ENV === 'production';

export default pool => {
  const { createLogger, format, transports } = require('winston');
  const Sentry = require('winston-transport-sentry');

  // winstonPapertrail.on('error', function(err) {
  // // Handle, report, or silently ignore connection errors and failures
  // });
  const logger = createLogger({
    level: 'info',
    transports: [
      !isProduction && new transports.Console({ level: 'silly' }),
      isProduction &&
        new Sentry({
          level: 'info',
          dsn: process.env.SENTRY_DEBUG_DSN,
          tags: { key: 'value' },
          extra: { key: 'value' },
        }),
    ],
  });

  const refresh = 60000;

  const update = () => {
    logger.info(
      `-- [Pool] Health Update (${refresh / 1000}s) ------------------
  - .totalCount    ${pool.totalCount}
  - .idleCount     ${pool.idleCount}
  - .waitingCount  ${pool.waitingCount}
------------------------------------------------`,
    );
  };

  update();
  setInterval(update, refresh);

  pool.on('connect', (client: Client) => {
    logger.info('[Pool]->connect');
  });

  pool.on('acquire', (client: Client) => {
    logger.info('[Pool]->acquire');
  });

  pool.on('error', (err, client: Client) => {
    logger.error(err);
  });

  pool.on('remove', (client: Client) => {
    logger.info('[Pool]->remove');
  });
};
