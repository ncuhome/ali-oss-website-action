import path from 'path'
import { getEnv } from './env';

export const uploadBase = () => path.resolve(process.cwd(), getEnv().INPUT_FOLDER);

export const getRelativePath = (filepath: string) => filepath.slice(uploadBase().length);
