"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFolder = exports.getUploadCallback = void 0;
const walkdir_1 = require("./walkdir");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const env_1 = require("./env");
const chalk_1 = __importDefault(require("chalk"));
function getUploadCallback(client, base) {
    console.log('Current working Directory is', process.env);
    let callback = async (filepath) => {
        if (fs_1.default.lstatSync(filepath).isFile()) {
            console.log(chalk_1.default.green('UPLOAD'), filepath);
            await client.put(filepath.substr(base.length), filepath);
        }
    };
    return callback;
}
exports.getUploadCallback = getUploadCallback;
async function uploadFolder(client) {
    const uploadBase = path_1.default.resolve(process.cwd(), (0, env_1.getEnv)('FOLDER'));
    const callback = getUploadCallback(client, uploadBase);
    const result = await (0, walkdir_1.walkdir)(uploadBase, callback);
}
exports.uploadFolder = uploadFolder;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3VwbG9hZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFDQSx1Q0FBcUQ7QUFDckQsNENBQW9CO0FBQ3BCLGdEQUF3QjtBQUN4QiwrQkFBK0I7QUFDL0Isa0RBQTBCO0FBRTFCLFNBQWdCLGlCQUFpQixDQUFDLE1BQVcsRUFBRSxJQUFZO0lBQ3pELE9BQU8sQ0FBQyxHQUFHLENBQUMsOEJBQThCLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRXpELElBQUksUUFBUSxHQUFvQixLQUFLLEVBQUUsUUFBUSxFQUFFLEVBQUU7UUFDakQsSUFBSSxZQUFFLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFO1lBQ25DLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBSyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3QyxNQUFNLE1BQU0sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsUUFBUSxDQUFDLENBQUM7U0FDMUQ7SUFDSCxDQUFDLENBQUE7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBVkQsOENBVUM7QUFFTSxLQUFLLFVBQVUsWUFBWSxDQUFDLE1BQVc7SUFDNUMsTUFBTSxVQUFVLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBQSxZQUFNLEVBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztJQUNqRSxNQUFNLFFBQVEsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFBLGlCQUFPLEVBQUMsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFKRCxvQ0FJQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPU1MgZnJvbSBcImFsaS1vc3NcIjtcbmltcG9ydCB7IHdhbGtkaXJDYWxsYmFjaywgd2Fsa2RpciB9IGZyb20gJy4vd2Fsa2Rpcic7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5pbXBvcnQgY2hhbGsgZnJvbSBcImNoYWxrXCI7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVcGxvYWRDYWxsYmFjayhjbGllbnQ6IE9TUywgYmFzZTogc3RyaW5nKTogd2Fsa2RpckNhbGxiYWNrIHtcbiAgY29uc29sZS5sb2coJ0N1cnJlbnQgd29ya2luZyBEaXJlY3RvcnkgaXMnLCBwcm9jZXNzLmVudik7XG5cbiAgbGV0IGNhbGxiYWNrOiB3YWxrZGlyQ2FsbGJhY2sgPSBhc3luYyAoZmlsZXBhdGgpID0+IHtcbiAgICBpZiAoZnMubHN0YXRTeW5jKGZpbGVwYXRoKS5pc0ZpbGUoKSkge1xuICAgICAgY29uc29sZS5sb2coY2hhbGsuZ3JlZW4oJ1VQTE9BRCcpLCBmaWxlcGF0aCk7XG4gICAgICBhd2FpdCBjbGllbnQucHV0KGZpbGVwYXRoLnN1YnN0cihiYXNlLmxlbmd0aCksIGZpbGVwYXRoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNhbGxiYWNrO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkRm9sZGVyKGNsaWVudDogT1NTKSB7XG4gIGNvbnN0IHVwbG9hZEJhc2UgPSBwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgZ2V0RW52KCdGT0xERVInKSk7XG4gIGNvbnN0IGNhbGxiYWNrID0gZ2V0VXBsb2FkQ2FsbGJhY2soY2xpZW50LCB1cGxvYWRCYXNlKTtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgd2Fsa2Rpcih1cGxvYWRCYXNlLCBjYWxsYmFjayk7XG59XG4iXX0=