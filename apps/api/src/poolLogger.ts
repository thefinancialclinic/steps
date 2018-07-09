import { Client } from 'pg';

export default pool => {
  const refresh = 60000;
  const update = () => {
    process.stdout.write(
      `-- [Pool] Health Update (${refresh / 1000}s) ------------------`,
    );
    process.stdout.write('');
    process.stdout.write(' - .totalCount  ', pool.totalCount);
    process.stdout.write(' - .idleCount   ', pool.idleCount);
    process.stdout.write(' - .waitingCount', pool.waitingCount);
    process.stdout.write('------------------------------------------------');
  };
  update();
  setInterval(update, refresh);

  pool.on('connect', (client: Client) => {
    process.stdout.write('[Pool]->connect');
  });

  pool.on('acquire', (client: Client) => {
    process.stdout.write('[Pool]->acquire');
  });

  pool.on('error', (err, client: Client) => {
    process.stderr.write('-- [Pool]->error ------------------------------');
    process.stderr.write('error', err);
    process.stderr.write('----------------------------------------------');
  });

  pool.on('remove', (client: Client) => {
    process.stdout.write('[Pool]->remove');
  });
};
