
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin")

module.exports = {
    mode: "development",
    devtool: "source-map",
    devServer: {
        hot: true,
        proxy: {// 只做代理,为角色跨域问题而实现.
            "/Api": {
                target: "http://localhost:9001",
                pathRewrite: {
                    "^Api": ""
                },
                secure: false,
                changeOrigin: true
            }
        },
    },
    plugins: [
        new ReactRefreshPlugin(),//热更新
    ]
}