import OSS from "ali-oss";
import { getEnv } from './env';

export async function configOSSWebsite(client: OSS) {
  const { INPUT_CONFIGUREWEBSITE, INPUT_BUCKET, INPUT_INDEXPAGE, INPUT_404PAGE } = getEnv();
  if (INPUT_CONFIGUREWEBSITE?.toUpperCase() === 'TRUE') {
    let config: OSS.PutBucketWebsiteConfig = {
      index: INPUT_INDEXPAGE || 'index.html',
      error: INPUT_404PAGE || '',
    };
    await client.putBucketWebsite(INPUT_BUCKET, config)
  }
}
