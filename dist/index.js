"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bucket_1 = require("./bucket");
const upload_1 = require("./upload");
const dotenv = __importStar(require("dotenv"));
const core = __importStar(require("@actions/core"));
process.env.NODE_ENV === 'development' && dotenv.config();
const main = async () => {
    try {
        const store = await (0, bucket_1.useBucket)();
        await (0, upload_1.uploadFolder)(store);
    }
    catch (error) {
        console.error(error);
        core.setFailed(error);
    }
};
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEscUNBQXFDO0FBQ3JDLHFDQUF3QztBQUN4QywrQ0FBaUM7QUFDakMsb0RBQXNDO0FBRXRDLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxLQUFLLGFBQWEsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFFMUQsTUFBTSxJQUFJLEdBQUcsS0FBSyxJQUFJLEVBQUU7SUFDdEIsSUFBSTtRQUNGLE1BQU0sS0FBSyxHQUFHLE1BQU0sSUFBQSxrQkFBUyxHQUFFLENBQUM7UUFDaEMsTUFBTSxJQUFBLHFCQUFZLEVBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7SUFBQyxPQUFPLEtBQUssRUFBRTtRQUNkLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUN0QjtBQUNILENBQUMsQ0FBQTtBQUVELElBQUksRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlQnVja2V0IH0gZnJvbSAnLi9idWNrZXQnO1xuaW1wb3J0IHsgdXBsb2FkRm9sZGVyIH0gZnJvbSAnLi91cGxvYWQnO1xuaW1wb3J0ICogYXMgZG90ZW52IGZyb20gJ2RvdGVudic7XG5pbXBvcnQgKiBhcyBjb3JlIGZyb20gJ0BhY3Rpb25zL2NvcmUnO1xuXG5wcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50JyAmJiBkb3RlbnYuY29uZmlnKCk7XG5cbmNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgc3RvcmUgPSBhd2FpdCB1c2VCdWNrZXQoKTtcbiAgICBhd2FpdCB1cGxvYWRGb2xkZXIoc3RvcmUpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoZXJyb3IpO1xuICAgIGNvcmUuc2V0RmFpbGVkKGVycm9yKVxuICB9XG59XG5cbm1haW4oKTtcbiJdfQ==