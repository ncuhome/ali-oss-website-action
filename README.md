# ali-oss-website-action

![status](https://github.com/ncuhome/ali-oss-website-action/actions/workflows/test.yml/badge.svg)


快速部署你的网站至阿里云 OSS。

## Why this one？

社区已有[许多竞品](https://github.com/search?q=ali-oss+action)，这个 Action 有何不同?

- 大多数 Action 年久失修，本 Repo 由活跃的 NCUHOME 维护
- 竞品都只支持纯粹的上传功能，本 Action 计划支持增量更新。
- 版本控制，本 Action 基于 git tag 与 OSS 版本管理提供快速回滚的策略
- 支持配置托管与回源策略
- 支持自动配置 Ali DNS CNAME 解析记录，解放双手

## 开始使用

在你的 `.github/workflows` 配置中，添加以下内容。

```yml
- name: Upload website to Aliyun OSS
  uses: ncuhome/ali-oss-website-action
  id: upload
  with:
    folder: <folder name> # 待上传的文件夹
    accessKeyId: ${{ secrets.ACCESSKEYID }} ## 通过 secrets 注入 ak
    accessKeySecret: ${{ secrets.ACCESSKEYSECRET }}
    bucket: <bucket name> # 要上传到的 bucket, 若不存在会自动新建
    endpoint: oss-cn-hangzhou.aliyuncs.com # 指定区域的 oss endpoint
    incremental: true # 开启增量上传，只上传 md5 值变化、新增、删除 的文件
```

## Roadmap
> order listed by priority
- [x] 配置静态页面
- [ ] 自动配置 CDN 与 DNS 解析
- [x] 增量更新，上传加速
- [ ] 缓存策略配置
- [ ] 版本控制与快速回滚
- [ ] 忽略特定的文件，遵循 .gitignore 语法

## License

MIT @NCUHOME
