import process from 'process';

export function getEnv(): Envs {
  return process.env as Envs;
}

export const booleanTrueEnv = (envVar: string | undefined) => envVar && String.prototype.toUpperCase.call(envVar) === 'TRUE';

export const DO_NOT_DELETE_MD5MAP_JSON = 'DO_NOT_DELETE_MD5MAP.json';
