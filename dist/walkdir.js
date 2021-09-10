"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.walkdir = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
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
exports.walkdir = walkdir;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Fsa2Rpci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy93YWxrZGlyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLGdEQUF3QjtBQUN4Qiw0Q0FBb0I7QUFJYixLQUFLLFVBQVUsT0FBTyxDQUFDLE9BQWUsRUFBRSxRQUEwQjtJQUN2RSxJQUFJLFNBQVMsR0FBYSxFQUFFLENBQUM7SUFDN0IsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDbEQsTUFBTSxLQUFLLEdBQUcsWUFBRSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2QyxLQUFLLE1BQU0sUUFBUSxJQUFJLEtBQUssRUFBRTtRQUM1QixJQUFJLFFBQVEsR0FBRyxjQUFJLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUVoRCxJQUFJLFlBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDeEMsU0FBUyxHQUFHLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxPQUFPLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7U0FDakU7YUFBTSxJQUFJLFlBQUUsQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDMUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMxQjtRQUVELElBQUksUUFBUSxFQUFFO1lBQ1osTUFBTSxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDMUI7S0FDRjtJQUNELE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUFsQkQsMEJBa0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgZnMgZnJvbSAnZnMnO1xuXG5leHBvcnQgdHlwZSB3YWxrZGlyQ2FsbGJhY2sgPSAoZmlsZXBhdGg6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhbGtkaXIoZGlyUGF0aDogc3RyaW5nLCBjYWxsYmFjaz86IHdhbGtkaXJDYWxsYmFjayk6IFByb21pc2U8c3RyaW5nW10+IHtcbiAgbGV0IGZpbGVwYXRoczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgYWJzb2x1dGUgPSBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCBkaXJQYXRoKTtcbiAgY29uc3QgZmlsZXMgPSBmcy5yZWFkZGlyU3luYyhhYnNvbHV0ZSk7XG4gIGZvciAoY29uc3QgZmlsZW5hbWUgb2YgZmlsZXMpIHtcbiAgICBsZXQgZnVsbFBhdGggPSBwYXRoLnJlc29sdmUoYWJzb2x1dGUsIGZpbGVuYW1lKTtcblxuICAgIGlmIChmcy5sc3RhdFN5bmMoZnVsbFBhdGgpLmlzRGlyZWN0b3J5KCkpIHtcbiAgICAgIGZpbGVwYXRocyA9IGZpbGVwYXRocy5jb25jYXQoYXdhaXQgd2Fsa2RpcihmdWxsUGF0aCwgY2FsbGJhY2spKTtcbiAgICB9IGVsc2UgaWYgKGZzLmxzdGF0U3luYyhmdWxsUGF0aCkuaXNGaWxlKCkpIHtcbiAgICAgIGZpbGVwYXRocy5wdXNoKGZ1bGxQYXRoKTtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGF3YWl0IGNhbGxiYWNrKGZ1bGxQYXRoKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZpbGVwYXRocztcbn1cbiJdfQ==