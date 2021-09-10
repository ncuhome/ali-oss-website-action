import OSS, { PutBucketWebsiteConfig } from "ali-oss";
import { getEnv } from './env';

export async function configOSSWebsite(client: OSS) {
  const { INPUT_BUCKET, INPUT_INDEXPAGE, INPUT_404PAGE } = getEnv();
  const websiteConfig = await client.getBucketWebsite(INPUT_BUCKET);
  const putWebsiteConfig: PutBucketWebsiteConfig = {
    index: INPUT_INDEXPAGE || websiteConfig.index,
    error: INPUT_404PAGE || websiteConfig.error,
  }
  await client.putBucketWebsite(INPUT_BUCKET, putWebsiteConfig);
}
