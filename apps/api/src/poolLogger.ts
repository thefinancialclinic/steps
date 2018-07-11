import { Client } from 'pg';
import logger from './winston';

const isProduction = process.env.NODE_ENV === 'production';

export default pool => {
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
