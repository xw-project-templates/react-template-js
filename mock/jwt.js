const fs = require('fs');
const koa = require('koa')
const cors = require("koa2-cors")// cors 解决跨域.
const Router = require("koa-router")
const bodyParser = require("koa-bodyparser")
const jwt = require('jsonwebtoken')

const app = new koa()
const testRouter = new Router();

const PRIVATE_KEY = fs.readFileSync("./keys/private.key");
const PUBLIC_KEY = fs.readFileSync("./keys/public.key");

// 登录账号接口
testRouter.post('/login', (ctx, next) => {
    // 获取到的账号和密码
    const user = ctx.request.body
    const token = jwt.sign(user, PRIVATE_KEY, {
        expiresIn: 10,
        algorithm: "RS256"// 算法
    })
    ctx.body = token;
})

// 验证账号接口


app.use(bodyParser())
app.use(cors())
app.use(testRouter.routes())
app.use(testRouter.allowedMethods())


app.listen(9001, () => {
    console.log("服务器已启动~");
})