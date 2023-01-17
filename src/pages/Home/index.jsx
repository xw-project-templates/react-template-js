import React, { memo } from 'react'
import { getHomeList } from '@/store/modules/home.js'
import { testOther } from '@/services/modules/home'
import { Button } from 'antd'


const Home = memo(() => {


    const handleOtherRequest = () => {
        testOther().then(res => {
            console.log(res)
        })
    }


    return (
        <div>
            <label>Home页面:</label>
            <button onClick={() => { handleOtherRequest() }}>测试其他的aixos请求</button>
        </div>
    )
})

export default Home