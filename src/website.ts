import OSS from "ali-oss";
import { getEnv } from './env';

export async function configOSSWebsite(client: OSS) {
  const { INPUT_BUCKET, INPUT_INDEXPAGE, INPUT_404PAGE } = getEnv();
    await client.putBucketWebsite(INPUT_BUCKET, {
      index: INPUT_INDEXPAGE || 'index.html',
      error: INPUT_404PAGE || '',
    });
}
