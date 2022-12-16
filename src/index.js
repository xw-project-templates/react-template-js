import React from 'react'
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN'
import { HashRouter } from 'react-router-dom'
import "normalize.css"

import App from "./app";

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
    <ConfigProvider locale={zhCN}>
        <HashRouter>
            <App />
        </HashRouter>
    </ConfigProvider>
)
