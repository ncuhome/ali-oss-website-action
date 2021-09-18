import OSS from 'ali-oss';
import { getOSSClient } from './client';
import { getEnv } from './utils/env';

export async function useBucket(): Promise<OSS> {
  const client = getOSSClient();

  const exist =  await isBucketExist(client);
  if (!exist) {
    await createBucket(client);
  }

  // use the BUCKET as default;
  client.useBucket(getEnv().INPUT_BUCKET);
  return client;
}

async function isBucketExist(client: OSS): Promise<boolean> {
  const { INPUT_BUCKET } = getEnv()
  let exist = true;
  try {
    const ret = await client.getBucketInfo(INPUT_BUCKET);
  } catch (e) {
    const code = (e as any).code;
    if (code === 'NoSuchBucket') {
      exist = false;
    } else {
      throw new Error(e as any);
    }
  }
  return exist;
}

async function createBucket(client: OSS) {
  const { INPUT_BUCKET } = getEnv();
  const { res, bucket } = await client.putBucket(INPUT_BUCKET);
  if (res.status === 200) {
    console.log(`✌️ Successfully create Bucket: ${bucket}`);
  } else {
    throw new Error(`CreateBucket Failed, error: ${res}`);
  }
};
