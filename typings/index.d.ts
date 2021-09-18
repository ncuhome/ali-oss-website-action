type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P>
? P
: never

type MD5Map = Record<string, string>

interface Envs extends NodeJS.ProcessEnv {
  INPUT_FOLDER: string;
  INPUT_ACCESSKEYID: string;
  INPUT_ACCESSKEYSECRET: string;
  INPUT_BUCKET: string;
  INPUT_ENDPOINT: string;
  INPUT_CONFIGUREWEBSITE: string;
  INPUT_INDEXPAGE: string;
  INPUT_404PAGE: string;
  INPUT_INCREMENTAL: string;
  INPUT_CNAME: string | undefined;
}
