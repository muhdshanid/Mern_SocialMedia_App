import { createSlice } from '@reduxjs/toolkit'


export const userReducer = createSlice({
    name:"user",
    initialState:{
        user:null,
        isFetching:false,
        error:false
    },
    reducers:{
        loginStart:(state) => {
            state.isFetching = true
        },
        loginSuccess:(state,action) => {
            state.isFetching = false
            state.user = action.payload
            state.error = false
        },
        loginFail:(state,action) => {
            state.isFetching = false
            state.error = true
        },
        logout:(state) => {
            state.user = null
        }
    }
})

export const {loginStart,loginSuccess,loginFail,logout} = userReducer.actions

export default userReducer.reducer