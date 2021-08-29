import process from 'process';

interface Envs extends NodeJS.ProcessEnv {
  ACCESS_KEY_ID: string;
  ACCESS_KEY_SECRET: string;
  BUCKET: string;
  ENDPOINT: string;
  REGION: string;
  CNAME: string;
  FOLDER: string;
  EXCLUDE: string;
}

export function getEnv(name: string): string
export function getEnv(): Envs
export function getEnv(name?: string) {
  return name ? process.env[name] : process.env;
}
