const resolveApp = require("./path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { DefinePlugin } = require("webpack"); // 允许在编辑时创建配置的全局变量,是一个webpack内置插件,比如public中index.html的BASE_URL, 使用的是ejs模板
const CopyWebpackPlugin = require("copy-webpack-plugin")//将public中一些其他文件传到dist 中
const progressBarWebpackPlugin = require("progress-bar-webpack-plugin"); //进度条显示.
const webpackMerge = require("webpack-merge");
const SpeedMeasurePlugin = require("speed-measure-webpack-plugin"); //打包时间分析.

const smp = new SpeedMeasurePlugin();

const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

const commonConfig = (isProduction) => {
  return {
    entry: {
      index: "./src/index.js",
    },
    output: {
      filename: "bundle.js",
      path: resolveApp("./build"),
      chunkFilename: "[name].[hash:16].chunk.js",
    },
    devServer: {
      hot: true,
      // proxy: {
      //   "/Api": {
      //     target:"http://localhost:9001",
      //     pathRewrite:{
      //       "^Api":""
      //     },
      //     secure:false,
      //     changeOrigin:true
      //   }
      // },
    },
    // 解析到文件时自动添加扩展名.
    resolve: {
      extensions: [".wasm", ".mjs", ".js", ".json", ".jsx", ".ts", ".vue"], //尝试按顺序解析这些后缀名.
      alias: {
        "@": resolveApp("./src"),
        pages: resolveApp("./src/pages"),
        config: resolveApp("./src/config"),
        utils:resolveApp("./src/utils")
      },
    },
    resolveLoader: {
      modules: ["./xw-loader", "node_modules"],
    },
    // 优化相关的
    optimization: {
      splitChunks: {
        chunks: "all",
        minChunks: 1,
        cacheGroups: {
          vendor: {
            //第三方供应商node_modules打包时抽成这个命名
            test: /[\\/]node_modules[\\/]/,
            filename: "vendors_[id]_[hash:16].js",
            priority: -10,
          },
          default: {
            minChunks: 2,
            filename: "common_[id]_[hash:16].js",
            priority: -20,
          },
        },
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
            //自定义文件输出路径和属性
            filename: "img/[name].[hash:16][ext]",
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
            filename: "font/[name]/[hash:6][ext]",
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
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
      ],
    },
    plugins: [
      require("postcss-preset-env"), // 通过js给现代的css添加一些特性,转成大多数浏览器认识的CSS,
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
