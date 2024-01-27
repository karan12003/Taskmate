import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    token: "",
    login: true,
    signup: false,
    name: "",
    user: ""
}

export const tokenSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
        },
        setLogin: (state, action) => {
            state.login = action.payload
        },
        setSignup: (state, action) => {
            state.signup = action.payload
        },
        setName: (state, action) => {
            state.name = action.payload
        },
        setUser: (state, action) => {
            state.user = action.payload
        }
    }
})

export const { setToken, setLogin, setSignup,setName,setUser } = tokenSlice.actions;

export default tokenSlice.reducer