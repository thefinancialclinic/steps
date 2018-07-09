import { Client } from 'pg';

export default pool => {
  const refresh = 60000;
  const update = () => {
    console.log(
      `-- [Pool] Health Update (${refresh / 1000}s) ------------------`,
    );
    console.log();
    console.log(' - .totalCount  ', pool.totalCount);
    console.log(' - .idleCount   ', pool.idleCount);
    console.log(' - .waitingCount', pool.waitingCount);
    console.log('------------------------------------------------');
  };
  update();
  setInterval(update, refresh);

  pool.on('connect', (client: Client) => {
    console.log('[Pool]->connect');
  });

  pool.on('acquire', (client: Client) => {
    console.log('[Pool]->acquire');
  });

  pool.on('error', (err, client: Client) => {
    console.error('-- [Pool]->error ------------------------------');
    console.error('error', err);
    console.error('----------------------------------------------');
  });

  pool.on('remove', (client: Client) => {
    console.log('[Pool]->remove');
  });
};
