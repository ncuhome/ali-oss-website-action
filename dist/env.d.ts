/// <reference types="node" />
interface Envs extends NodeJS.ProcessEnv {
    FOLDER: string;
    ACCESS_KEY_ID: string;
    ACCESS_KEY_SECRET: string;
    BUCKET: string;
    ENDPOINT: string;
}
export declare function getEnv(name: string): string;
export declare function getEnv(): Envs;
export {};
