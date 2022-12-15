
// // 默认为同步的loader.
// module.exports = function (content) {
//     console.log('content1')

//     // 同步返回两种方式,第一种是直接return content 第二种是直接调用this.callback(this,content)
//     this.callback(null, content)
//     // return content
// }


// 异步的loader.
module.exports = function (content) {
    const callback = this.async();

    setTimeout(()=>{
        console.log('content1')
        callback(null,content)
    },1000)

}