import axios from "axios";
import { TIME_OUT, BASE_URL } from "./config";
import { getToken } from 'utils/cookie'

class Request {
    constructor(baseURL, timeout, JWTOKEN) {
        this.instance = axios.create({
            baseURL,
            timeout
        })

        // 设置cookier
        this.instance.defaults.headers.common['Authorization'] = JWTOKEN

        // 请求拦截
        this.instance.interceptors.request.use((config) => {
            return config
        })
    }
    request(config) {
        return this.instance.request(config)
    }
    get(config) {
        return this.request({ ...config, method: "get" })
    }
    post(config) {
        return this.request({ ...config, method: "post" })
    }
}

export default new Request(BASE_URL, TIME_OUT, getToken())