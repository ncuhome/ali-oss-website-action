import OSS from "ali-oss";
import { walkdirCallback } from './walkdir';
import fs from 'fs';
import path from 'path';
import { getEnv } from './env';

export function getUploadCallback(client: OSS): walkdirCallback {
  const uploadBase = path.resolve(process.cwd(), getEnv('FOLDER'));
  let callback: walkdirCallback = async (filepath) => {
    if (fs.lstatSync(filepath).isFile()) {
      await client.put(filepath.substr(uploadBase.length), filepath);
    }
  }
  return callback;
}