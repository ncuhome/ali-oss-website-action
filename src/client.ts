import OSS from 'ali-oss';
import { getEnv } from './env';

export const getOSSClient = (): OSS => {
  const { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BUCKET, REGION } = getEnv();

  const client = new OSS({
    region: REGION,
    accessKeyId: ACCESS_KEY_ID,
    accessKeySecret: ACCESS_KEY_SECRET,
    bucket: BUCKET,
  });
  return client;
}
