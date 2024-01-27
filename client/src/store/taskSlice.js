import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    "tasks":[],
    "todo":[],
    "ongoing":[],
    "completed":[],
    "overdue":[]
}

export const taskSlice = createSlice({
    name:"taskmate",
    initialState,
    reducers:{
        setTasks:(state,action)=>{
            state.tasks = action.payload;
            state.todo = state.tasks.filter((task) => task.status==='todo')
            state.ongoing = state.tasks.filter((task) => task.status==='ongoing')
            state.completed = state.tasks.filter((task) => task.status==='completed')
            state.overdue = state.tasks.filter((task) => task.status==='overdue')
        }
    }
})

export const {setCompleted,setOngoing,setOverdue,setTasks,setTodo} = taskSlice.actions;

export default taskSlice.reducer