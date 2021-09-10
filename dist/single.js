System.register("env", ["process"], function (exports_1, context_1) {
    "use strict";
    var process_1;
    var __moduleName = context_1 && context_1.id;
    function getEnv(name) {
        return name ? process_1.default.env[name] : process_1.default.env;
    }
    exports_1("getEnv", getEnv);
    return {
        setters: [
            function (process_1_1) {
                process_1 = process_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("client", ["ali-oss", "env"], function (exports_2, context_2) {
    "use strict";
    var ali_oss_1, env_1, getOSSClient;
    var __moduleName = context_2 && context_2.id;
    return {
        setters: [
            function (ali_oss_1_1) {
                ali_oss_1 = ali_oss_1_1;
            },
            function (env_1_1) {
                env_1 = env_1_1;
            }
        ],
        execute: function () {
            exports_2("getOSSClient", getOSSClient = () => {
                const { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BUCKET, ENDPOINT } = env_1.getEnv();
                const client = new ali_oss_1.default({
                    accessKeyId: ACCESS_KEY_ID,
                    accessKeySecret: ACCESS_KEY_SECRET,
                    endpoint: ENDPOINT,
                    bucket: BUCKET,
                });
                return client;
            });
        }
    };
});
System.register("bucket", ["client", "env"], function (exports_3, context_3) {
    "use strict";
    var client_1, env_2;
    var __moduleName = context_3 && context_3.id;
    async function useBucket() {
        const client = client_1.getOSSClient();
        const exist = await isBucketExist(client);
        if (!exist) {
            await createBucket(client);
        }
        // use the BUCKET as default;
        client.useBucket(env_2.getEnv('BUCKET'));
        return client;
    }
    exports_3("useBucket", useBucket);
    async function isBucketExist(client) {
        const { BUCKET } = env_2.getEnv();
        let exist = true;
        try {
            const ret = await client.getBucketInfo(BUCKET);
        }
        catch (e) {
            const code = e.code;
            if (code === 'NoSuchBucket') {
                exist = false;
            }
            else {
                throw new Error(e);
            }
        }
        return exist;
    }
    async function createBucket(client) {
        const { BUCKET } = env_2.getEnv();
        const { res, bucket } = await client.putBucket(BUCKET);
        if (res.status === 200) {
            console.log(`✌️ Successfully create Bucket: ${bucket}`);
        }
        else {
            throw new Error(`CreateBucket Failed, error: ${res}`);
        }
    }
    return {
        setters: [
            function (client_1_1) {
                client_1 = client_1_1;
            },
            function (env_2_1) {
                env_2 = env_2_1;
            }
        ],
        execute: function () {
            ;
        }
    };
});
System.register("walkdir", ["path", "fs"], function (exports_4, context_4) {
    "use strict";
    var path_1, fs_1;
    var __moduleName = context_4 && context_4.id;
    async function walkdir(dirPath, callback) {
        let filepaths = [];
        const absolute = path_1.default.resolve(__dirname, dirPath);
        const files = fs_1.default.readdirSync(absolute);
        for (const filename of files) {
            let fullPath = path_1.default.resolve(absolute, filename);
            if (fs_1.default.lstatSync(fullPath).isDirectory()) {
                filepaths = filepaths.concat(await walkdir(fullPath, callback));
            }
            else if (fs_1.default.lstatSync(fullPath).isFile()) {
                filepaths.push(fullPath);
            }
            if (callback) {
                await callback(fullPath);
            }
        }
        return filepaths;
    }
    exports_4("walkdir", walkdir);
    return {
        setters: [
            function (path_1_1) {
                path_1 = path_1_1;
            },
            function (fs_1_1) {
                fs_1 = fs_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("upload", ["walkdir", "fs", "path", "env", "chalk"], function (exports_5, context_5) {
    "use strict";
    var walkdir_1, fs_2, path_2, env_3, chalk_1;
    var __moduleName = context_5 && context_5.id;
    function getUploadCallback(client) {
        const uploadBase = path_2.default.resolve(process.cwd(), env_3.getEnv('FOLDER'));
        let callback = async (filepath) => {
            if (fs_2.default.lstatSync(filepath).isFile()) {
                console.log(chalk_1.default.green('UPLOAD'), filepath);
                await client.put(filepath.substr(uploadBase.length), filepath);
            }
        };
        return callback;
    }
    exports_5("getUploadCallback", getUploadCallback);
    async function uploadFolder(client) {
        const base = path_2.default.resolve(process.cwd(), env_3.getEnv('FOLDER'));
        const callback = getUploadCallback(client);
        const result = await walkdir_1.walkdir(base, callback);
    }
    exports_5("uploadFolder", uploadFolder);
    return {
        setters: [
            function (walkdir_1_1) {
                walkdir_1 = walkdir_1_1;
            },
            function (fs_2_1) {
                fs_2 = fs_2_1;
            },
            function (path_2_1) {
                path_2 = path_2_1;
            },
            function (env_3_1) {
                env_3 = env_3_1;
            },
            function (chalk_1_1) {
                chalk_1 = chalk_1_1;
            }
        ],
        execute: function () {
        }
    };
});
System.register("index", ["bucket", "upload", "dotenv"], function (exports_6, context_6) {
    "use strict";
    var bucket_1, upload_1, dotenv, main;
    var __moduleName = context_6 && context_6.id;
    return {
        setters: [
            function (bucket_1_1) {
                bucket_1 = bucket_1_1;
            },
            function (upload_1_1) {
                upload_1 = upload_1_1;
            },
            function (dotenv_1) {
                dotenv = dotenv_1;
            }
        ],
        execute: function () {
            process.env.NODE_ENV === 'development' && dotenv.config();
            main = async () => {
                try {
                    const store = await bucket_1.useBucket();
                    await upload_1.uploadFolder(store);
                }
                catch (e) {
                    console.error(e);
                    process.exit(1);
                }
            };
            main();
        }
    };
});
System.register("website", ["env"], function (exports_7, context_7) {
    "use strict";
    var env_4;
    var __moduleName = context_7 && context_7.id;
    function configOSSWebsite(client) {
        const { BUCKET } = env_4.getEnv();
    }
    exports_7("configOSSWebsite", configOSSWebsite);
    return {
        setters: [
            function (env_4_1) {
                env_4 = env_4_1;
            }
        ],
        execute: function () {
        }
    };
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2Vudi50cyIsIi4uL3NyYy9jbGllbnQudHMiLCIuLi9zcmMvYnVja2V0LnRzIiwiLi4vc3JjL3dhbGtkaXIudHMiLCIuLi9zcmMvdXBsb2FkLnRzIiwiLi4vc3JjL2luZGV4LnRzIiwiLi4vc3JjL3dlYnNpdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztJQVlBLFNBQWdCLE1BQU0sQ0FBQyxJQUFhO1FBQ2xDLE9BQU8sSUFBSSxDQUFDLENBQUMsQ0FBQyxpQkFBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsaUJBQU8sQ0FBQyxHQUFHLENBQUM7SUFDaEQsQ0FBQzs7Ozs7Ozs7O1FBQ0QsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNaRCwwQkFBYSxZQUFZLEdBQUcsR0FBUSxFQUFFO2dCQUNwQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxZQUFNLEVBQUUsQ0FBQztnQkFFeEUsTUFBTSxNQUFNLEdBQUcsSUFBSSxpQkFBRyxDQUFDO29CQUNyQixXQUFXLEVBQUUsYUFBYTtvQkFDMUIsZUFBZSxFQUFFLGlCQUFpQjtvQkFDbEMsUUFBUSxFQUFFLFFBQVE7b0JBQ2xCLE1BQU0sRUFBRSxNQUFNO2lCQUNmLENBQUMsQ0FBQztnQkFDSCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLEVBQUE7UUFDRCxDQUFDOzs7Ozs7O0lDVk0sS0FBSyxVQUFVLFNBQVM7UUFDN0IsTUFBTSxNQUFNLEdBQUcscUJBQVksRUFBRSxDQUFDO1FBRTlCLE1BQU0sS0FBSyxHQUFJLE1BQU0sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDVixNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUM1QjtRQUVELDZCQUE2QjtRQUM3QixNQUFNLENBQUMsU0FB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QUM5QixDQUFDOzs7Ozs7Ozs7UUFDRCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHByb2Nlc3MgZnJvbSAncHJvY2Vzcyc7XG5cbmludGVyZmFjZSBFbnZzIGV4dGVuZHMgTm9kZUpTLlByb2Nlc3NFbnYge1xuICBGT0xERVI6IHN0cmluZztcbiAgQUNDRVNTX0tFWV9JRDogc3RyaW5nO1xuICBBQ0NFU1NfS0VZX1NFQ1JFVDogc3RyaW5nO1xuICBCVUNLRVQ6IHN0cmluZztcbiAgRU5EUE9JTlQ6IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVudihuYW1lOiBzdHJpbmcpOiBzdHJpbmdcbmV4cG9ydCBmdW5jdGlvbiBnZXRFbnYoKTogRW52c1xuZXhwb3J0IGZ1bmN0aW9uIGdldEVudihuYW1lPzogc3RyaW5nKSB7XG4gIHJldHVybiBuYW1lID8gcHJvY2Vzcy5lbnZbbmFtZV0gOiBwcm9jZXNzLmVudjtcbn1cbiIsImltcG9ydCBPU1MgZnJvbSAnYWxpLW9zcyc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5cbmV4cG9ydCBjb25zdCBnZXRPU1NDbGllbnQgPSAoKTogT1NTID0+IHtcbiAgY29uc3QgeyBBQ0NFU1NfS0VZX0lELCBBQ0NFU1NfS0VZX1NFQ1JFVCwgQlVDS0VULCBFTkRQT0lOVCB9ID0gZ2V0RW52KCk7XG5cbiAgY29uc3QgY2xpZW50ID0gbmV3IE9TUyh7XG4gICAgYWNjZXNzS2V5SWQ6IEFDQ0VTU19LRVlfSUQsXG4gICAgYWNjZXNzS2V5U2VjcmV0OiBBQ0NFU1NfS0VZX1NFQ1JFVCxcbiAgICBlbmRwb2ludDogRU5EUE9JTlQsXG4gICAgYnVja2V0OiBCVUNLRVQsXG4gIH0pO1xuICByZXR1cm4gY2xpZW50O1xufVxuIiwiaW1wb3J0IE9TUyBmcm9tICdhbGktb3NzJztcbmltcG9ydCB7IGdldE9TU0NsaWVudCB9IGZyb20gJy4vY2xpZW50JztcbmltcG9ydCB7IGdldEVudiB9IGZyb20gJy4vZW52JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVzZUJ1Y2tldCgpOiBQcm9taXNlPE9TUz4ge1xuICBjb25zdCBjbGllbnQgPSBnZXRPU1NDbGllbnQoKTtcblxuICBjb25zdCBleGlzdCA9ICBhd2FpdCBpc0J1Y2tldEV4aXN0KGNsaWVudCk7XG4gIGlmICghZXhpc3QpIHtcbiAgICBhd2FpdCBjcmVhdGVCdWNrZXQoY2xpZW50KTtcbiAgfVxuXG4gIC8vIHVzZSB0aGUgQlVDS0VUIGFzIGRlZmF1bHQ7XG4gIGNsaWVudC51c2VCdWNrZXQoZ2V0RW52KCdCVUNLRVQnKSk7XG4gIHJldHVybiBjbGllbnQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGlzQnVja2V0RXhpc3QoY2xpZW50OiBPU1MpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgeyBCVUNLRVQgfSA9IGdldEVudigpXG4gIGxldCBleGlzdCA9IHRydWU7XG4gIHRyeSB7XG4gICAgY29uc3QgcmV0ID0gYXdhaXQgY2xpZW50LmdldEJ1Y2tldEluZm8oQlVDS0VUKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnN0IGNvZGUgPSAoZSBhcyBhbnkpLmNvZGU7XG4gICAgaWYgKGNvZGUgPT09ICdOb1N1Y2hCdWNrZXQnKSB7XG4gICAgICBleGlzdCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZSBhcyBhbnkpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZXhpc3Q7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZUJ1Y2tldChjbGllbnQ6IE9TUykge1xuICBjb25zdCB7IEJVQ0tFVCB9ID0gZ2V0RW52KCk7XG4gIGNvbnN0IHsgcmVzLCBidWNrZXQgfSA9IGF3YWl0IGNsaWVudC5wdXRCdWNrZXQoQlVDS0VUKTtcbiAgaWYgKHJlcy5zdGF0dXMgPT09IDIwMCkge1xuICAgIGNvbnNvbGUubG9nKGDinIzvuI8gU3VjY2Vzc2Z1bGx5IGNyZWF0ZSBCdWNrZXQ6ICR7YnVja2V0fWApO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgQ3JlYXRlQnVja2V0IEZhaWxlZCwgZXJyb3I6ICR7cmVzfWApO1xuICB9XG59O1xuIiwiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgdHlwZSB3YWxrZGlyQ2FsbGJhY2sgPSAoZmlsZXBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhbGtkaXIoZGlyUGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IHdhbGtkaXJDYWxsYmFjayk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgbGV0IGZpbGVwYXRoczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgYWJzb2x1dGUgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBkaXJQYXRoKTtcbiAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhhYnNvbHV0ZSk7XG4gIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZXMpIHtcbiAgICBsZXQgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoYWJzb2x1dGUsIGZpbGVuYW1lKTtcblxuICAgIGlmIChmcy5sc3RhdFN5bmMoZnVsbFBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIGZpbGVwYXRocyA9IGZpbGVwYXRocy5jb25jYXQoYXdhaXQgd2Fsa2RpcihmdWxsUGF0aCwgY2FsbGJhY2spKTtcbiAgICB9IGVsc2UgaWYgKGZzLmxzdGF0U3luYyhmdWxsUGF0aCkuaXNGaWxlKCkpIHtcbiAgICAgIGZpbGVwYXRocy5wdXNoKGZ1bGxQYXRoKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGF3YWl0IGNhbGxiYWNrKGZ1bGxQYXRoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpbGVwYXRocztcbn1cbiIsImltcG9ydCBPU1MgZnJvbSBcImFsaS1vc3NcIjtcbmltcG9ydCB7IHdhbGtkaXJDYWxsYmFjaywgd2Fsa2RpciB9IGZyb20gJy4vd2Fsa2Rpcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGxvYWRDYWxsYmFjayhjbGllbnQ6IE9TUyk6IHdhbGtkaXJDYWxsYmFjayB7XG4gIGNvbnN0IHVwbG9hZEJhc2UgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZ2V0RW52KCdGT0xERVInKSk7XG4gIGxldCBjYWxsYmFjazogd2Fsa2RpckNhbGxiYWNrID0gYXN5bmMgKGZpbGVwYXRoKSA9PiB7XG4gICAgaWYgKGZzLmxzdGF0U3luYyhmaWxlcGF0aCkuaXNGaWxlKCkpIHtcbiAgICAgIGNvbnNvbGUubG9nKGNoYWxrLmdyZWVuKCdVUExPQUQnKSwgZmlsZXBhdGgpO1xuICAgICAgYXdhaXQgY2xpZW50LnB1dChmaWxlcGF0aC5zdWJzdHIodXBsb2FkQmFzZS5sZW5ndGgpLCBmaWxlcGF0aCk7XG4gICAgfVxuICB9XG4gIHJldHVybiBjYWxsYmFjaztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEZvbGRlcihjbGllbnQ6IE9TUykge1xuICBjb25zdCBiYXNlID0gcGF0aC5yZXNvbHZlKHByb2Nlc3MuY3dkKCksIGdldEVudignRk9MREVSJykpO1xuICBjb25zdCBjYWxsYmFjayA9IGdldFVwbG9hZENhbGxiYWNrKGNsaWVudCk7XG4gIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHdhbGtkaXIoYmFzZSwgY2FsbGJhY2spO1xufVxuIiwiaW1wb3J0IHsgdXNlQnVja2V0IH0gZnJvbSAnLi9idWNrZXQnO1xuaW1wb3J0IHsgdXBsb2FkRm9sZGVyIH0gZnJvbSAnLi91cGxvYWQnO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5cbnByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnICYmIGRvdGVudi5jb25maWcoKTtcblxuY29uc3QgbWFpbiA9IGFzeW5jICgpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzdG9yZSA9IGF3YWl0IHVzZUJ1Y2tldCgpO1xuICAgIGF3YWl0IHVwbG9hZEZvbGRlcihzdG9yZSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zb2xlLmVycm9yKGUpO1xuICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgfVxufVxuXG5tYWluKCk7XG4iLCJpbXBvcnQgT1NTIGZyb20gXCJhbGktb3NzXCI7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25maWdPU1NXZWJzaXRlKGNsaWVudDogT1NTKSB7XG4gIGNvbnN0IHsgQlVDS0VUIH0gPSBnZXRFbnYoKTtcbn1cbiJdfQ==