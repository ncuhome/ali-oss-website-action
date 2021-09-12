type PromiseInnerType<T extends Promise<any>> = T extends Promise<infer P>
? P
: never

type MD5Map = Record<string, string>
