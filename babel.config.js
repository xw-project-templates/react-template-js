const fs = require('fs')

// 判断是否支持ts
const tsBabel = fs.existsSync('./node_modules/@babel/preset-typescript') ? ["@babel/preset-typescript"] : null

const presets = [
  // 配置polyfill, 我们可以单独引用core-js和regenerator-runtime来完成polyfill的使用!.
  [
    "@babel/preset-env",
    {
      useBuiltIns: "entry",
      corejs: 3,
    },
  ],
  ["@babel/preset-react"],
  tsBabel,
].filter(Boolean);

let plugins = [];

const isProduction = process.env.NODE_ENV === "production";

if (!isProduction) {
  plugins.push(["react-refresh/babel"]);
}

// 模块的热更新侄只在开发环境.
module.exports = {
  presets,
  plugins,
};
