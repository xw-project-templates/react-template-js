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

// Login登录测试
export function getLogin(params) {
    return Request.post({
        url: "/login",
        data:params
    })
}