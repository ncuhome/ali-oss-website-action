import OSS from "ali-oss";
import { walkdirCallback, walkdir } from './walkdir';
import fs from 'fs';
import { uploadBase, getRelativePath, getEnv, truthyEnv } from './constants';
import { getChangedFiles, generateMD5Map } from './increment';
import chalk from "chalk";

export function getUploadCallback(client: OSS): walkdirCallback {
  let callback: walkdirCallback = async (filepath) => {
    if (fs.lstatSync(filepath).isFile()) {
      console.log(chalk.green('UPLOAD'), filepath);
      await client.put(getRelativePath(filepath), filepath);
    }
  }
  return callback;
}

export async function uploadPaths(client: OSS, filepaths: string[]) {
  for (const filepath of filepaths) {
    await client.put(getRelativePath(filepath), filepath);
  }
}

export async function uploadFolder(client: OSS) {
  const { INPUT_INCREMENTAL } = getEnv();
  console.log(chalk.green('Start uploading files'));

  let filesToUpload: string[] = [];

  if (truthyEnv(INPUT_INCREMENTAL)) {
    const md5map = await generateMD5Map();
    filesToUpload = await getChangedFiles(client, md5map);
  }

  const base = uploadBase();
  const callback = getUploadCallback(client);
  const result = await walkdir(base, callback);
  console.log(chalk.green('Finish uploading'));
}
