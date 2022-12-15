const marked = require("marked")
// const hljs = require("highlight.js")//高亮显示

module.exports = function (content) {
    // marked.setOptions({
    //     highlight: function (code, lang) {
    //         return hljs.highlight(lang, code).value;
    //     }
    // })
    console.log(content,'111')

    // const htmlContent = marked(content);
    // const innerContent = `'` + htmlContent + `'`;
    // const moduleCode = `var code =${innerContent}; export default code`
    return content
}