# 说明

## 运行说明

- 安装 nodejs (版本需要大于 4.0)
- 安装依赖 `npm install`
- 编译前端样式 `npm run build`
- 开启后端服务器 `npm start`
- 客户端开启 socket 连接 `npm run client`

## 结构说明

```
├── README.md  说明文档
├── app.js
├── bin
│   └── www 运行文件
├── client
│   └── app.js socket 用户端入口程序
├── frontend 未编译的前端样式文件
│   └── styles
├── gulpfile.js gulp文件,用于前端构建
├── package.json npm依赖文件
├── public 前端静态文件
│   ├── images
│   ├── javascripts
│   └── styles
├── routes 后端路由文件
│   ├── index.js
│   └── users.js
├── socket socket 服务器端入口程序
│   └── index.js
└── views 前端样式脚本
    ├── error.ejs
    └── index.ejs
```
