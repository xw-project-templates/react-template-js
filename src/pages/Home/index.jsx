import React, { memo } from 'react'
import { getHome, postHome } from '@/services/modules/home.js'
import { Button } from 'antd'

const Home = memo(() => {

    const clickButton = () => {
        postHome().then(res => {
            console.log(res);
        })
    }
    return (
        <div>
            <label>Home:</label>
            <Button
                type="primary"
                onClick={() => { clickButton() }}>发送请求</Button>
        </div>
    )
})

export default Home