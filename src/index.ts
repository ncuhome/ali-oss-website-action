import { useBucket } from './bucket';
import { uploadFolder } from './upload';
import * as dotenv from 'dotenv';

process.env.NODE_ENV === 'development' && dotenv.config();

const main = async () => {
  try {
    const store = await useBucket();
    await uploadFolder(store);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
