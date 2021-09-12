import process from 'process';
import path from 'path';

interface Envs extends NodeJS.ProcessEnv {
  INPUT_FOLDER: string;
  INPUT_ACCESSKEYID: string;
  INPUT_ACCESSKEYSECRET: string;
  INPUT_BUCKET: string;
  INPUT_ENDPOINT: string;
  INPUT_CONFIGUREWEBSITE: string;
  INPUT_INDEXPAGE: string;
  INPUT_404PAGE: string;
  INPUT_INCREMENTAL: string;
}

export function getEnv(): Envs {
  return process.env as Envs;
}

export const truthyEnv = (envVar: string) => String.prototype.toUpperCase.call(envVar) === 'TRUE';

/** 上传文件夹的路径 */
export const uploadBase = () => path.resolve(process.cwd(), getEnv().INPUT_FOLDER);

export const getRelativePath = (filepath: string) => filepath.slice(uploadBase().length);

export const DO_NOT_DELETE_MD5MAP_JSON = 'DO_NOT_DELETE_MD5MAP.json';
