import { createSlice } from '@reduxjs/toolkit'


// 同步
const homeSlice = createSlice({
    name: "home",
    initialState: {
        homeList: []
    },
    reducers: {
        getHomeList(state, { payload }) {
            state.homeList = payload
        }
    }
})

export const { getHomeList } = homeSlice.actions
export default homeSlice.reducer