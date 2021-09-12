import { sync as MD5Sync } from "md5-file";
import { walkdir, walkdirCallback } from "./walkdir";
import { uploadBase, DO_NOT_DELETE_MD5MAP_JSON } from "./constants";
import { writeFileSync } from "fs";
import OSS from 'ali-oss'
import path from "path";
import chalk from "chalk";

export async function generateMD5Map() {
  const base = uploadBase();
  const map: MD5Map = {};
  const callback: walkdirCallback = async (filepath: string) => {
    const relative = filepath.slice(base.length);
    map[relative] = MD5Sync(filepath);
  };
  await walkdir(base, callback);
  return map;
}

export async function getChangedFiles(client: OSS, currentMap: MD5Map): Promise<string[]> {
  let previousMap: MD5Map = {};
  const files: string[] = [];
  try {
    const result = await client.get(DO_NOT_DELETE_MD5MAP_JSON);
    previousMap = JSON.parse(String.prototype.toString.call(result.content));
  } catch (e) {
    console.log(chalk.yellow(`${DO_NOT_DELETE_MD5MAP_JSON} is NOT FOUND`));
  }

  for (const [filepath, hash] of Object.entries(currentMap)) {
    // new file
    if (!(filepath in previousMap)) {
      files.push(filepath);
      continue;
    }

    // changed file
    if (hash !== previousMap[filepath]) {
      files.push(filepath);
      continue;
    }
  }

  console.log(`Detect changed files`, files);
  return files;
}
