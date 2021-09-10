"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.useBucket = void 0;
const client_1 = require("./client");
const env_1 = require("./env");
async function useBucket() {
    const client = (0, client_1.getOSSClient)();
    const exist = await isBucketExist(client);
    if (!exist) {
        await createBucket(client);
    }
    // use the BUCKET as default;
    client.useBucket((0, env_1.getEnv)('BUCKET'));
    return client;
}
exports.useBucket = useBucket;
async function isBucketExist(client) {
    const { BUCKET } = (0, env_1.getEnv)();
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
    const { BUCKET } = (0, env_1.getEnv)();
    const { res, bucket } = await client.putBucket(BUCKET);
    if (res.status === 200) {
        console.log(`✌️ Successfully create Bucket: ${bucket}`);
    }
    else {
        throw new Error(`CreateBucket Failed, error: ${res}`);
    }
}
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2J1Y2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxQ0FBd0M7QUFDeEMsK0JBQStCO0FBRXhCLEtBQUssVUFBVSxTQUFTO0lBQzdCLE1BQU0sTUFBTSxHQUFHLElBQUEscUJBQVksR0FBRSxDQUFDO0lBRTlCLE1BQU0sS0FBSyxHQUFJLE1BQU0sYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQzNDLElBQUksQ0FBQyxLQUFLLEVBQUU7UUFDVixNQUFNLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM1QjtJQUVELDZCQUE2QjtJQUM3QixNQUFNLENBQUMsU0FBUyxDQUFDLElBQUEsWUFBTSxFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7SUFDbkMsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQVhELDhCQVdDO0FBRUQsS0FBSyxVQUFVLGFBQWEsQ0FBQyxNQUFXO0lBQ3RDLE1BQU0sRUFBRSxNQUFNLEVBQUUsR0FBRyxJQUFBLFlBQU0sR0FBRSxDQUFBO0lBQzNCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztJQUNqQixJQUFJO1FBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ2hEO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixNQUFNLElBQUksR0FBSSxDQUFTLENBQUMsSUFBSSxDQUFDO1FBQzdCLElBQUksSUFBSSxLQUFLLGNBQWMsRUFBRTtZQUMzQixLQUFLLEdBQUcsS0FBSyxDQUFDO1NBQ2Y7YUFBTTtZQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsQ0FBUSxDQUFDLENBQUM7U0FDM0I7S0FDRjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVELEtBQUssVUFBVSxZQUFZLENBQUMsTUFBVztJQUNyQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBQSxZQUFNLEdBQUUsQ0FBQztJQUM1QixNQUFNLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN2RCxJQUFJLEdBQUcsQ0FBQyxNQUFNLEtBQUssR0FBRyxFQUFFO1FBQ3RCLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0NBQWtDLE1BQU0sRUFBRSxDQUFDLENBQUM7S0FDekQ7U0FBTTtRQUNMLE1BQU0sSUFBSSxLQUFLLENBQUMsK0JBQStCLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDdkQ7QUFDSCxDQUFDO0FBQUEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBPU1MgZnJvbSAnYWxpLW9zcyc7XG5pbXBvcnQgeyBnZXRPU1NDbGllbnQgfSBmcm9tICcuL2NsaWVudCc7XG5pbXBvcnQgeyBnZXRFbnYgfSBmcm9tICcuL2Vudic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1c2VCdWNrZXQoKTogUHJvbWlzZTxPU1M+IHtcbiAgY29uc3QgY2xpZW50ID0gZ2V0T1NTQ2xpZW50KCk7XG5cbiAgY29uc3QgZXhpc3QgPSAgYXdhaXQgaXNCdWNrZXRFeGlzdChjbGllbnQpO1xuICBpZiAoIWV4aXN0KSB7XG4gICAgYXdhaXQgY3JlYXRlQnVja2V0KGNsaWVudCk7XG4gIH1cblxuICAvLyB1c2UgdGhlIEJVQ0tFVCBhcyBkZWZhdWx0O1xuICBjbGllbnQudXNlQnVja2V0KGdldEVudignQlVDS0VUJykpO1xuICByZXR1cm4gY2xpZW50O1xufVxuXG5hc3luYyBmdW5jdGlvbiBpc0J1Y2tldEV4aXN0KGNsaWVudDogT1NTKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IHsgQlVDS0VUIH0gPSBnZXRFbnYoKVxuICBsZXQgZXhpc3QgPSB0cnVlO1xuICB0cnkge1xuICAgIGNvbnN0IHJldCA9IGF3YWl0IGNsaWVudC5nZXRCdWNrZXRJbmZvKEJVQ0tFVCk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBjb25zdCBjb2RlID0gKGUgYXMgYW55KS5jb2RlO1xuICAgIGlmIChjb2RlID09PSAnTm9TdWNoQnVja2V0Jykge1xuICAgICAgZXhpc3QgPSBmYWxzZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGUgYXMgYW55KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGV4aXN0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVCdWNrZXQoY2xpZW50OiBPU1MpIHtcbiAgY29uc3QgeyBCVUNLRVQgfSA9IGdldEVudigpO1xuICBjb25zdCB7IHJlcywgYnVja2V0IH0gPSBhd2FpdCBjbGllbnQucHV0QnVja2V0KEJVQ0tFVCk7XG4gIGlmIChyZXMuc3RhdHVzID09PSAyMDApIHtcbiAgICBjb25zb2xlLmxvZyhg4pyM77iPIFN1Y2Nlc3NmdWxseSBjcmVhdGUgQnVja2V0OiAke2J1Y2tldH1gKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENyZWF0ZUJ1Y2tldCBGYWlsZWQsIGVycm9yOiAke3Jlc31gKTtcbiAgfVxufTtcbiJdfQ==