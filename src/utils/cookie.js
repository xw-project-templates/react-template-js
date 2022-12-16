import Cookie from "js-cookie"

const JWTTOKEN = "JWTTOKEN"

export function getToken() {
    return Cookie.get(JWTTOKEN)
}

export function setToken(token, expires) {
    return Cookie.set(JWTTOKEN, token, expires)
}