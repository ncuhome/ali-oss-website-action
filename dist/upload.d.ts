import OSS from "ali-oss";
import { walkdirCallback } from './walkdir';
export declare function getUploadCallback(client: OSS, base: string): walkdirCallback;
export declare function uploadFolder(client: OSS): Promise<void>;
