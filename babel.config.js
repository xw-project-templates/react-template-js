// console.log(process.env.NODE_ENV,'111')
const presets = [
    // 配置polyfill, 我们可以单独引用core-js和regenerator-runtime来完成polyfill的使用!.
    ["@babel/preset-env", {
        //useBuiltIns 取值为3个,false,useage,entry
        // false:不用任何的polyfill相关的代码
        // usage:代码中需要哪些polyfill,就引用相关的api.
        // entry:手动在入口文件中导入core-js/regenerator-runtime,根据目标浏览器引用对应的polyfill.
        useBuiltIns: "entry",
        corejs: 3
    }],
    ["@babel/preset-react"],
    ["@babel/preset-typescript"]
]

let plugins = []

const isProduction = process.env.NODE_ENV === 'production'

if(!isProduction){
    plugins.push(["react-refresh/babel"])
}else{

}

// 模块的热更新侄只在开发环境.

module.exports = {
    presets,
    plugins
}