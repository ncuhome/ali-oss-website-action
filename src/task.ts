import OSS from "ali-oss";
import { configOSSWebsite } from './website';
import { getEnv } from './env';

export async function performTasks(client: OSS) {
  const { INPUT_CONFIGUREWEBSITE } = getEnv();

  if ((INPUT_CONFIGUREWEBSITE as string).toUpperCase() === 'TRUE')
    await configOSSWebsite(client);
}
