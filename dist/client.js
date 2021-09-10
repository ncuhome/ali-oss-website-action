"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOSSClient = void 0;
const ali_oss_1 = __importDefault(require("ali-oss"));
const env_1 = require("./env");
const getOSSClient = () => {
    const { ACCESS_KEY_ID, ACCESS_KEY_SECRET, BUCKET, ENDPOINT } = (0, env_1.getEnv)();
    const client = new ali_oss_1.default({
        accessKeyId: ACCESS_KEY_ID,
        accessKeySecret: ACCESS_KEY_SECRET,
        endpoint: ENDPOINT,
        bucket: BUCKET,
    });
    return client;
};
exports.getOSSClient = getOSSClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxzREFBMEI7QUFDMUIsK0JBQStCO0FBRXhCLE1BQU0sWUFBWSxHQUFHLEdBQVEsRUFBRTtJQUNwQyxNQUFNLEVBQUUsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFBLFlBQU0sR0FBRSxDQUFDO0lBRXhFLE1BQU0sTUFBTSxHQUFHLElBQUksaUJBQUcsQ0FBQztRQUNyQixXQUFXLEVBQUUsYUFBYTtRQUMxQixlQUFlLEVBQUUsaUJBQWlCO1FBQ2xDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLE1BQU0sRUFBRSxNQUFNO0tBQ2YsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyxDQUFBO0FBVlksUUFBQSxZQUFZLGdCQVV4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPU1MgZnJvbSAnYWxpLW9zcyc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5cbmV4cG9ydCBjb25zdCBnZXRPU1NDbGllbnQgPSAoKTogT1NTID0+IHtcbiAgY29uc3QgeyBBQ0NFU1NfS0VZX0lELCBBQ0NFU1NfS0VZX1NFQ1JFVCwgQlVDS0VULCBFTkRQT0lOVCB9ID0gZ2V0RW52KCk7XG5cbiAgY29uc3QgY2xpZW50ID0gbmV3IE9TUyh7XG4gICAgYWNjZXNzS2V5SWQ6IEFDQ0VTU19LRVlfSUQsXG4gICAgYWNjZXNzS2V5U2VjcmV0OiBBQ0NFU1NfS0VZX1NFQ1JFVCxcbiAgICBlbmRwb2ludDogRU5EUE9JTlQsXG4gICAgYnVja2V0OiBCVUNLRVQsXG4gIH0pO1xuICByZXR1cm4gY2xpZW50O1xufVxuIl19