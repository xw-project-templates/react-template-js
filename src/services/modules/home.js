import Request from '../request'

// get 请求测试
export function getHome() {
    return Request.get({
        url: "/get"
    })
}

// post 请求测试
export function postHome() {
    return Request.post({
        url: "/post"
    })
}