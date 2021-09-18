import { getEnv } from "./utils/env";
import Core from "@alicloud/pop-core";

export class DNS {
  private client: Core;

  constructor() {
    const { INPUT_ACCESSKEYID, INPUT_ACCESSKEYSECRET } = getEnv();
    this.client = new Core({
      accessKeyId: INPUT_ACCESSKEYID,
      accessKeySecret: INPUT_ACCESSKEYSECRET,
      endpoint: "https://alidns.cn-hangzhou.aliyuncs.com",
      apiVersion: "2015-01-09",
    });
  }

  public async addCnameRecord(target: string) {
    const { INPUT_CNAME } = getEnv();
    const index = INPUT_CNAME?.indexOf('.');
    const RR = INPUT_CNAME?.substr(0, index);
    const domain = INPUT_CNAME?.substr((index as number) + 1)
    console.log(RR, domain)
    const params = {
      DomainName: domain,
      RR: RR,
      Type: "CNAME",
      Value: target,
    };
    const requestOption = {
      method: "POST",
    };
    try {
      const result = await this.client.request('AddDomainRecord', params, requestOption);
    } catch (e) {
      if (e.data.Code === 'DomainRecordDuplicate') {
        console.log('请注意：DNS 解析记录已存在')
      } else {
        throw e;
      }
    }
  }
}
