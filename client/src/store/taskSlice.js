import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "tasks":[]
}

export const taskSlice = createSlice({
    name:"taskmate",
    initialState,
    reducers:{
        setTasks:(state,action)=>{
            state.tasks = action.payload
        }
    }
})

export const {setTasks} = taskSlice.actions;

export default taskSlice.reducer