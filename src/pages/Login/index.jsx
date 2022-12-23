import React, { memo } from 'react'
import { Button, Form, Input } from 'antd';
import crypto from 'utils/cryptojs.js'

import { getLogin } from '@/services/modules/home'
import { setToken } from 'utils/cookie.js'
import { useNavigate } from 'react-router';

// import './index.scss'
// import './index.less'

const Login = memo(() => {

    const Navigate = useNavigate()

    const onFinish = (values) => {
        const account = {
            username: crypto.encrypt(values.username),
            password: crypto.encrypt(values.password)
        }

        getLogin(account).then(res => {
            console.log(res)
            setToken(res.data, 10000)
            Navigate('/home')
        })
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (<div className='content'>
        <Form
            className='form'
            name="basic"
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Password"
                name="password"
                rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}
            >
                <Input.Password />
            </Form.Item>


            <Form.Item
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>
    )
})

export default Login