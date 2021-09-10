import OSS from "ali-oss";
import { getEnv } from './env';

export function configOSSWebsite(client: OSS) {
  const { BUCKET } = getEnv();
}
