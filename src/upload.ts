import OSS from "ali-oss";
import { uploadBase, getRelativePath, getEnv, truthyEnv, DO_NOT_DELETE_MD5MAP_JSON } from './constants';
import { walkdir } from './walkdir';
import { getChangedFiles, generateMD5Map } from './increment';
import chalk from "chalk";

export async function uploadMd5map(client: OSS, map: MD5Map) {
  const data = Buffer.from(JSON.stringify(map));
  console.log('Upload md5Map record');
  await client.put(DO_NOT_DELETE_MD5MAP_JSON, data);
}

export async function uploadByPaths(client: OSS, filepaths: string[]) {
  for (const filepath of filepaths) {
    console.log(chalk.green('UPLOAD'), filepath);
    await client.put(getRelativePath(filepath), filepath);
  }
}

export async function uploadFolder(client: OSS) {
  const { INPUT_INCREMENTAL } = getEnv();
  const incremental = truthyEnv(INPUT_INCREMENTAL);

  console.log(`Start uploading files, incremental: ${incremental}`);

  let filesToUpload: string[] = [];
  if (incremental) {
    const md5map = await generateMD5Map();
    const changedFiles = await getChangedFiles(client, md5map);
    filesToUpload = changedFiles.map(item => `${uploadBase()}${item}`);
    await uploadMd5map(client, md5map);
  } else {
    // remove DO_NOT_DELETE_MD5MAP_JSON
    console.log('Removing DO_NOT_DELETE_MD5MAP_JSON');
    await client.delete(DO_NOT_DELETE_MD5MAP_JSON);
    // upload all
    filesToUpload = await walkdir(uploadBase());
  }
  console.log(`${filesToUpload.length} files to upload`);
  await uploadByPaths(client, filesToUpload);
  console.log(chalk.green('Finish uploading'));
}
