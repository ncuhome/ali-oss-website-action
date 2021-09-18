import OSS from "ali-oss";
import { configOSSWebsite } from './website';
import { getEnv, booleanTrueEnv } from './utils/env';
import { CDN } from "./cdn";
import { DNS } from './dns';

export async function performTasks(client: OSS) {
  const { INPUT_CONFIGUREWEBSITE, INPUT_CNAME } = getEnv();

  // Cannot use Optional Chaining here, for node12 doesn't support.
  if (booleanTrueEnv(INPUT_CONFIGUREWEBSITE))
    await configOSSWebsite(client);

  if (INPUT_CNAME) {
    const cdnCname = await new CDN().configure();
    const ret = await new DNS().addCnameRecord(cdnCname);
  }
}
