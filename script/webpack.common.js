const resolveApp = require("./path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack"); // 允许在编辑时创建配置的全局变量,是一个webpack内置插件,比如public中index.html的BASE_URL, 使用的是ejs模板
const CopyWebpackPlugin = require("copy-webpack-plugin")//将public中一些其他文件传到dist 中
const progressBarWebpackPlugin = require("progress-bar-webpack-plugin"); //进度条显示.
const webpackMerge = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //打包时间分析.
// const EslintWebpackPlugin = require("eslint-webpack-plugin")

const smp = new SpeedMeasurePlugin();

const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const commonConfig = (isProduction) => {
  return {
    entry: {
      index: "./src/index.js",
    },
    output: {
      filename: "static/js/[name]_[[hash:8].js",
      path: resolveApp("./build"),
      clean: true
    },
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".ts", ".vue"], //尝试按顺序解析这些后缀名.
      alias: {
        "@": resolveApp("./src"),
        pages: resolveApp("./src/pages"),
        config: resolveApp("./src/config"),
        utils: resolveApp("./src/utils")
      },
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use:
            [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                },
              },
              "postcss-loader",
            ],
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "sass-loader",
          ],
        },
        {
          test: /\.less$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                importLoaders: 2,
              },
            },
            "postcss-loader",
            "less-loader",
          ],
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/, //相当于url-loader
          type: "asset",
          generator: {
            filename: "static/img/[name].[hash:12][ext]",
          },
          parser: {
            // url-loader 的limit 效果
            dataUrlCondition: {
              maxSize: 100 * 1024,
            },
          },
        },
        // 字体设置// 相当于file-loader
        {
          test: /\.ttf|eot|woff2?$/i,
          type: "asset/resource",
          generator: {
            filename: "static/fonts/[name]/[hash:6][ext]",
          },
        },
        // babel-preset 设置预设
        {
          test: /.m?js$/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: "last 2 version",
                  },
                ],
              ],
            },
          },
        },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "babel-loader",
            },
            // {// 是否开启多进程打包
            //   loader: "thread-loader",
            //   options: {
            //     workers: 3
            //   }
            // }
          ]
        },
      ],
    },
    plugins: [
      require("postcss-preset-env"),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: "cxw测试",
        template: resolveApp("./public/index.html"),
      }),
      new DefinePlugin({
        BASE_URL: '"./"'
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: "public",
            globOptions: {//除了忽视的这几个文件,其他的全部copy.
              ignore: [
                "**/index.html"//这是要忽略htmlWebpackPlugin中生成的index.html文件.
              ]
            }
          }
        ]
      }),
      // new EslintWebpackPlugin({
      //   extensions: [".js", ".jsx"],
      //   emitWarning:false
      // }),
      new progressBarWebpackPlugin(),
    ],
  };
};

module.exports = function (env) {
  const isProduction = env.production;
  process.env.NODE_ENV = isProduction ? "production" : "development";

  const config = isProduction ? prodConfig : devConfig;
  const mergeConfig = webpackMerge.merge(commonConfig(isProduction), config);

  if (isProduction) {
    return smp.wrap(mergeConfig)//生产环境对打包的时间进行分析
  }
  return mergeConfig;
};
