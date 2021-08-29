import { getOSSClient } from './client';
import { getEnv } from './env';
import { useBucket } from './bucket';
import dotenv from 'dotenv';

process.env.NODE_ENV === 'development' && dotenv.config();

const main = async () => {
  const { BUCKET } = getEnv();
  console.log('BUCKET from index.ts', BUCKET);
  const client = getOSSClient();
  const store = await useBucket(client);
}

main();
