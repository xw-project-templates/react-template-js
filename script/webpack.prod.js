
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css的压缩-通常是去除无用的空格.
const TerserPlugin = require("terser-webpack-plugin")

const webpack = require('webpack')

module.exports = {
    mode: "production",
    // devtool: false,
    devtool: "source-map",
    optimization: {
        splitChunks: {
            chunks: "all",
            minSize: 20000,
            maxAsyncRequests: 6,
            maxInitialRequests: 9,
            automaticNameDelimiter: '~',
            cacheGroups: {
                uisother: {
                    test: /([\\/]node_modules[\\/](moment|zrender)[\\/]|[\\/]src[\\/]assets[\\/]fonts[\\/]iconfont.js)/,
                    name: 'uisother',
                    priority: -1
                },
                // uisantd0: {
                //     test: /[\\/]node_modules[\\/](@ant-design)[\\/]/,
                //     name: 'uisantd0',
                //     priority: -2
                // },
                uisantd: {
                    test: /[\\/]node_modules[\\/](antd)[\\/]/,
                    name: 'uisantd',
                    priority: -3
                },
                locallibs: {
                    test: /[\\/]node_modules[\\/](react|react-dom|redux|react-redux|react-router|react-router-dom)[\\/]/,
                    name: 'locallibs',
                    priority: -7
                },
                localcharts: {
                    test: /[\\/]node_modules[\\/](echarts|echarts-for-react)[\\/]/,
                    name: 'localcharts',
                    priority: -8
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    priority: -10
                },
                default: {
                    name: 'default',
                    minChunks: 2,
                    priority: -20,
                    filename: "common_[name]_[hash:16].js",
                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            new TerserPlugin({
                parallel: true,//使用多进程并发以提高构建速度.
                extractComments: false// 是否将注释剥离到单独的文件当中.
            })
        ],
    },
    performance: {// 用于可以控制webpack 如何通知[asset] 和入口文件起点超过指定文件限制.用于计算性能提示的文件
        hints: false,
        maxAssetSize: 500000,//根据单个资源体积(单位: bytes)，控制 webpack 何时生成性能提示。
        maxEntrypointSize: 2000000,//对于所有资源，要充分利用初始加载时(initial load time)期间。此选项根据入口起点的最大体积，控制 webpack 何时生成性能提示。
        assetFilter: function (assetFilename) {
            // 提供资源文件名的断言函数
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        },
    },
    plugins: [
        new CssMinimizerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),//作用是对作用域进行提升,并且让webpack打包后的代码更小,运行更快.
    ]
}