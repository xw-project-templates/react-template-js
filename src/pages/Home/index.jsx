import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { getHomeList } from '@/store/modules/home.js'
import { Button } from 'antd'


const Home = memo(() => {

    const dispatch = useDispatch()


    return (
        <div>
            <label>Home页面:</label>
        </div>
    )
})

export default Home