/// <reference types="node" />
/// <reference types="ali-oss" />
declare module "env" {
    interface Envs extends NodeJS.ProcessEnv {
        FOLDER: string;
        ACCESS_KEY_ID: string;
        ACCESS_KEY_SECRET: string;
        BUCKET: string;
        ENDPOINT: string;
    }
    export function getEnv(name: string): string;
    export function getEnv(): Envs;
}
declare module "client" {
    import OSS from 'ali-oss';
    export const getOSSClient: () => OSS;
}
declare module "bucket" {
    import OSS from 'ali-oss';
    export function useBucket(): Promise<OSS>;
}
declare module "walkdir" {
    export type walkdirCallback = (filepath: string) => Promise<void>;
    export function walkdir(dirPath: string, callback?: walkdirCallback): Promise<string[]>;
}
declare module "upload" {
    import OSS from "ali-oss";
    import { walkdirCallback } from "walkdir";
    export function getUploadCallback(client: OSS): walkdirCallback;
    export function uploadFolder(client: OSS): Promise<void>;
}
declare module "index" { }
declare module "website" {
    import OSS from "ali-oss";
    export function configOSSWebsite(client: OSS): void;
}
