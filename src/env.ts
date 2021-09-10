import process from 'process';

interface Envs extends NodeJS.ProcessEnv {
  INPUT_FOLDER: string;
  INPUT_ACCESSKEYID: string;
  INPUT_ACCESSKEYSECRET: string;
  INPUT_BUCKET: string;
  INPUT_ENDPOINT: string;
}

export function getEnv(): Envs {
  return process.env as Envs;
}
