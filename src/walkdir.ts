import path from 'path';
import fs from 'fs';

export type walkdirCallback = (filepath: string) => Promise<void>;

export async function walkdir(dirPath: string, callback?: walkdirCallback): Promise<string[]> {
  let filepaths: string[] = [];
  const absolute = path.resolve(__dirname, dirPath);
  const files = fs.readdirSync(absolute);
  for (const filename of files) {
    let fullPath = path.resolve(absolute, filename);

    if (fs.lstatSync(fullPath).isDirectory()) {
      filepaths = filepaths.concat(await walkdir(fullPath, callback));
    } else if (fs.lstatSync(fullPath).isFile()) {
      filepaths.push(fullPath);

      if (callback) {
        await callback(fullPath);
      }
    }
  }
  return filepaths;
}
