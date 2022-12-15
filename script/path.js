const path = require("path")

const appDir = process.cwd()//获取的是当前项目线程开始执行时的父目录.即package.json父目录
const resolveApp = (dir) => path.resolve(appDir, dir)

module.exports = resolveApp