
// 本地和生产环境下的基本路径.

const isProduction = process.env.NODE_ENV === "production"

const baseApi = {
    production: "http://localhost:9001",
    development: "http://localhost:9001"
}

export const BASE_URL = isProduction ? baseApi.production : baseApi.development
export const TIME_OUT = 5000