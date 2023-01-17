import Request from '../request'

// get 请求测试
export function getHome(params) {
    return Request.get({
        url: "/get",
        params,
    })
}

// post 请求测试
export function postHome(params) {
    return Request.post({
        url: "/post",
        data:params
    })
}
// 测试其他接口请求及响应拦截
export function testOther(params) {
    return Request.post({
        url: "/test",
        data:params
    })
}

// Login登录测试
export function getLogin(params) {
    return Request.post({
        url: "/login",
        data:params
    })
}