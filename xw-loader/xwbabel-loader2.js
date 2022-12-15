
// const { getOptions } = require('loader-utils')//loader 中传入和获取参数

module.exports = function (content) {
    console.log('content2')

    const callback = this.async(content)

    // const options = getOptions(this)

    // console.log(options)

    callback(null,content)
    // return content
}