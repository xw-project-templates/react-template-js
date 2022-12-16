
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
  ["@babel/preset-typescript"],
];

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
