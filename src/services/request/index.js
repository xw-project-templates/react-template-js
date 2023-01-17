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
    delete(config) {
        return this.request({ ...config, method: "delete" })
    }
    put(config) {
        return this.request({ ...config, method: "put" })
    }
    head(config) {
        return this.request({ ...config, method: "head" })
    }
    options(config) {
        return this.request({ ...config, method: "options" })
    }
    patch(config) {
        return this.request({ ...config, method: "patch" })
    }
}

export default new Request(BASE_URL, TIME_OUT, getToken())