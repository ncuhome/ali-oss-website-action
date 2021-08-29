import { getOSSClient } from './client';
import { getEnv } from './env';
import { useBucket } from './bucket';
import { getUploadCallback } from './upload';
import { walkdir } from './walkdir';
import dotenv from 'dotenv';
import path from 'path';

process.env.NODE_ENV === 'development' && dotenv.config();

const main = async () => {
  const { BUCKET, FOLDER } = getEnv();
  const client = getOSSClient();
  const store = await useBucket(client);
  const callback = getUploadCallback(store);
  const dirpath = path.resolve(process.cwd(), FOLDER);
  const result = await walkdir(dirpath, callback);
  console.log(result);
}

main();
