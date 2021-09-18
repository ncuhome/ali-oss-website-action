import { getEnv } from "./utils/env";
import Core from "@alicloud/pop-core";

export class CDN {
  private client: Core;

  constructor() {
    const { INPUT_ACCESSKEYID, INPUT_ACCESSKEYSECRET } = getEnv();
    this.client = new Core({
      accessKeyId: INPUT_ACCESSKEYID,
      accessKeySecret: INPUT_ACCESSKEYSECRET,
      endpoint: "https://cdn.aliyuncs.com",
      apiVersion: "2018-05-10",
    });
  }

  /** Configure and get cdnCname */
  public async configure() {
    console.log("Configure CDN");
    await this.addCdnDomain();
    const cdnCname = await this.getCdnCname();
    return cdnCname;
  }

  private async addCdnDomain() {
    const { INPUT_ENDPOINT, INPUT_BUCKET, INPUT_CNAME } = getEnv();
    const ossUrl = `${INPUT_BUCKET}.${INPUT_ENDPOINT}`;
    const params = {
      CdnType: "web",
      DomainName: INPUT_CNAME,
      Sources: `[{"content":"${ossUrl}","type":"oss","priority":"20","port":80,"weight":"10"}]`,
    };
    const requestOption = {
      method: "POST",
    };

    try {
      const result = await this.client.request(
        "AddCdnDomain",
        params,
        requestOption
      );
    } catch (e) {
      if (e.data.Code === 'DomainAlreadyExist')
        console.log('CDN 加速域名已存在');
      else
        throw new Error(e);
    }
  }

  private async getCdnCname() {
    const { INPUT_CNAME } = getEnv();
    const params = {
      DomainName: INPUT_CNAME,
    };
    const requestOption = {
      method: "POST",
    };
    const result: any = await this.client.request(
      "DescribeUserDomains",
      params,
      requestOption
    );
    const item = result?.Domains?.PageData.find(item => item.DomainName === INPUT_CNAME);
    return item?.Cname;
  }
}
