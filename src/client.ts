import OSS from 'ali-oss';
import { getEnv } from './utils/env';

export const getOSSClient = (): OSS => {
  const { INPUT_ACCESSKEYID, INPUT_ACCESSKEYSECRET, INPUT_BUCKET, INPUT_ENDPOINT } = getEnv();

  const client = new OSS({
    accessKeyId: INPUT_ACCESSKEYID,
    accessKeySecret: INPUT_ACCESSKEYSECRET,
    endpoint: INPUT_ENDPOINT,
    bucket: INPUT_BUCKET,
  });
  return client;
}
