
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css的压缩-通常是去除无用的空格.
const TerserPlugin = require("terser-webpack-plugin")

const webpack = require('webpack')

module.exports = {
    mode: "production",
    devtool: false,
    optimization: {
        minimizer: [
            new TerserPlugin({
                parallel: true,//使用多进程并发以提高构建速度.
                extractComments: false// 是否将注释剥离到单独的文件当中.
            })
        ]
    },

    plugins: [
        new CssMinimizerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),//作用是对作用域进行提升,并且让webpack打包后的代码更小,运行更快.
    ]
}