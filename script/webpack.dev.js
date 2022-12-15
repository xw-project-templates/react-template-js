
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: "source-map",
    module: {
        // rules: [
        //     {
        //         test: /\.js$/i,
        //         use: [
        //             "xwmd-loader"
        //         ]

        //     }
        // ]
    },
    plugins: [
        new ReactRefreshPlugin(),//热更新
    ]
}