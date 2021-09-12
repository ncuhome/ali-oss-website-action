import OSS, { PutBucketWebsiteConfig } from "ali-oss";
import { getEnv } from "./env";

export async function configOSSWebsite(client: OSS) {
  const { INPUT_BUCKET, INPUT_INDEXPAGE, INPUT_404PAGE } = getEnv();
  const websiteConfig = await getWebsiteConfig(client);
  let index = INPUT_INDEXPAGE;
  let error = INPUT_404PAGE;
  if (websiteConfig) {
    index = websiteConfig.index;
    error = websiteConfig.error;
  }

  const putWebsiteConfig: PutBucketWebsiteConfig = {
    index,
    error,
  };
  await client.putBucketWebsite(INPUT_BUCKET, putWebsiteConfig);
}

export async function getWebsiteConfig(client: OSS) {
  const { INPUT_BUCKET } = getEnv();
  let websiteConfig: PromiseInnerType<
    ReturnType<typeof client.getBucketWebsite>
  > | null = null;
  try {
    websiteConfig = await client.getBucketWebsite(INPUT_BUCKET);
  } catch (e) {
    websiteConfig = null;
    console.error("NoSuchWebsiteConfiguration");
    console.error(e);
  }
  return websiteConfig;
}
