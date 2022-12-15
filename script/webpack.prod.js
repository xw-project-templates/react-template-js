
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');// css的压缩-通常是去除无用的空格.
const TerserPlugin = require("terser-webpack-plugin")
// const PurgeCssPlugin = require('purgecss-webpack-plugin')//css的Tree Shaking
const CompressionPlugin = require('compression-webpack-plugin')//html压缩 - webpack对文件的压缩-.

const AutoUploadPlugin = require('../plugins/AutoUploadPlugin')

const resolveApp = require('./path')

const webpack = require('webpack')
const glob = require('glob')

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
        // new MiniCssExtractPlugin({
        //     filename:"css/[name].[contenthash:8].css",
        //     // chunkFilename:"css/[]"
        // })// 将css提取到一个单独的文件当中.
        new CssMinimizerPlugin(),
        new webpack.optimize.ModuleConcatenationPlugin(),//作用是对作用域进行提升,并且让webpack打包后的代码更小,运行更快.
        // new PurgeCssPlugin({//css的tree Shaking 消除死代码,未引用的代码.
        //     paths: glob.sync(`${resolveApp("./src")}/**/*`, { nodir: true }),
        //     safelist: function () {// 默认情况下,Purgecss 会将我们的html标签的样式移除掉,如果我们希望保留,可以添加一个safelist的属性
        //         return {
        //             standard: ["body", 'html']
        //         }
        //     }
        // }),
        // new CompressionPlugin({
        //     test: /\.(css|js)$/, //匹配哪些文件需要压缩
        //     minRatio: 0.7,//至少的压缩比例,
        //     algorithm: "gzip"// 采用的压缩算法,主要为gzip或者deflate
        // })
        // new AutoUploadPlugin({
        //     host:"192.168.9.224",
        //     port:"22",
        //     username:"root",
        //     password:"yisa2287",
        //     removePath:"/yisa/projectquote/test"
        // })
    ]
}