import { useBucket } from './bucket';
import { uploadFolder } from './upload';
import { performTasks } from './task';
import * as dotenv from 'dotenv';
import * as core from '@actions/core';

process.env.NODE_ENV === 'development' && dotenv.config();

const main = async () => {
  try {
    const store = await useBucket();
    await uploadFolder(store);
    await performTasks(store);
  } catch (error) {
    console.error(error);
    core.setFailed(error)
  }
}

main();
