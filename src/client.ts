import OSS from 'ali-oss';
import { getEnv } from './env';

export const getOSSClient = (): OSS => {
  const { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BUCKET, ENDPOINT } = getEnv();

  const client = new OSS({
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    endpoint: ENDPOINT,
    bucket: BUCKET,
  });
  return client;
}
