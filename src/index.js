import React, { Suspense } from 'react'
import { createRoot } from 'react-dom/client';
import 'antd/dist/reset.css'
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import zhCN from 'antd/es/locale/zh_CN'
import { HashRouter } from 'react-router-dom'
import store from './store';
import "normalize.css"

import App from "./app";

const container = document.getElementById("app")
const root = createRoot(container)

root.render(
    <Suspense fallback="loading">
        <ConfigProvider locale={zhCN}>
            <Provider store={store}>
                <HashRouter>
                    <App />
                </HashRouter>
            </Provider>
        </ConfigProvider>
    </Suspense>
)
