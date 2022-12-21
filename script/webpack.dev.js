
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: "source-map",
    plugins: [
        new ReactRefreshPlugin(),//热更新
    ]
}