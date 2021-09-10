import { useBucket } from './bucket';
import { uploadFolder } from './upload';
import * as dotenv from 'dotenv';
import * as core from '@actions/core';

process.env.NODE_ENV === 'development' && dotenv.config();

const main = async () => {
  console.log('ENV', process.env);
  try {
    const store = await useBucket();
    await uploadFolder(store);
  } catch (error) {
    console.error(error);
    core.setFailed(error)
  }
}

main();
