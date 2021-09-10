export declare type walkdirCallback = (filepath: string) => Promise<void>;
export declare function walkdir(dirPath: string, callback?: walkdirCallback): Promise<string[]>;
