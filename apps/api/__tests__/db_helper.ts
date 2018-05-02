import { Connection, createConnection } from 'typeorm';

let activeConn: Connection;

const getTestConnection = async () => {
  if(!activeConn) {
    activeConn = await createConnection('test');
  }
  return activeConn;
}

export { getTestConnection };
