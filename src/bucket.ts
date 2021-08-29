import OSS from 'ali-oss';
import { getEnv } from './env';

export async function useBucket(client: OSS): Promise<OSS> {
  const exist =  await isBucketExist(client);
  if (!exist) {
    await createBucket(client);
  }
  // use the BUCKET as default;
  client.useBucket(getEnv('BUCKET'));
  return client;
}

async function isBucketExist(client: OSS): Promise<boolean> {
  const { BUCKET } = getEnv()
  let exist = true;
  try {
    const ret = await client.getBucketInfo(BUCKET);
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
  const { BUCKET } = getEnv();
  const { res, bucket } = await client.putBucket(BUCKET);
  if (res.status === 200) {
    console.log(`✌️ Successfully create Bucket: ${bucket}`);
  } else {
    throw new Error(`CreateBucket Failed, error: ${res}`);
  }
};