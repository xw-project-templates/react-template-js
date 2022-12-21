import { configureStore } from '@reduxjs/toolkit'
import homeReducer from "@/store/modules/home.js"

const store = configureStore({
    reducer: {
        homeReducer,
    }
})

export default store