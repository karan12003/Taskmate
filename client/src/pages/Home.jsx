import React, { useEffect, useState } from "react";
import axios from 'axios'
import Card from "../components/Card";
import Alert from "../components/Alert";
import { useDispatch, useSelector } from "react-redux";
import Login from "../components/Login";
import Signup from "../components/Signup";
import NewTask from "../components/NewTask";
import { setTasks } from "../store/taskSlice";
import Header from "../components/Header";

export default function Home() {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [status, setStatus] = useState("")
    const [dueDate, setDueDate] = useState(new Date())
    const [alert, setAlert] = useState(null)
    const [priority, setPriority] = useState("Medium")
    const [category, setCategory] = useState("personal")
    const [updateId,setUpdateId]=useState("")
    const [loading, setLoading] = useState(false)

    const dispatch = useDispatch();

    var token = useSelector(state => (state.auth.token))
    const login = useSelector(state => state.auth.login)
    const signup = useSelector(state => state.auth.signup)

    const getTasks = () => {
        axios.get("http://localhost:5000/task", { headers: { "authorization": token } })
            .then((res) => dispatch(setTasks(res.data.tasks)))
            // .then(()=> setLoading(false))
            .catch(err => displayAlert("alert",err.response.data.message))
    }

    const tasks = useSelector((state) => state.taskmate.tasks)
    const todo = useSelector((state) => state.taskmate.todo)
    const ongoing = useSelector((state) => state.taskmate.ongoing)
    const completed = useSelector((state) => state.taskmate.completed)
    const overdue = useSelector((state) => state.taskmate.overdue)

    // console.log('re-rendered');

    useEffect(() => {
        getTasks()
    }, [token])

    const handleClick = (id) => {
        // console.log(id)
    }


    const displayAlert = (type, msg) => {
        setAlert({
            type: type,
            message: msg
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500)
    }

    const removeTask = (id) => {
        axios.delete(`http://localhost:5000/task/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then(res => {
                displayAlert("alert", "Task deleted Successfully")
                dispatch(setTasks(tasks.filter((task)=> task.id!==id)))
            })
            .catch(err => console.log(err.response.data.message))
    }

    const updateTask = (id) => {
        const addUpdateTask = document.querySelector(".updateTask")
        addUpdateTask.style.display = addUpdateTask.style.display === "flex" ? "none" : "flex";
        axios.get(`http://localhost:5000/task/${id}`, {
            headers: {
                authorization: token
            }
        })
            .then(res => {
                setDescription(res.data.task.description)
                setTitle(res.data.task.title)
                setPriority(res.data.task.priority)
                setStatus(res.data.task.status)
                setUpdateId(res.data.task.id)
            })
            .catch(err => {
                if (err.response.data.message !== "Task not found")
                    displayAlert("alert", err.response.data.message || "Some error occured")
            })

    }

    const handleUpdateSubmit = (e) => {
        e.preventDefault()
        axios.put(`http://localhost:5000/task/${updateId}`, document.querySelector("#update-form"), {
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                displayAlert("success", "Task Updated Successfully")
                dispatch(setTasks([...tasks.filter((task)=> task._id!==res.data.task._id),res.data.task]))
                document.querySelector(".updateTask").style.display = "none"
            })
            .catch(err => {
                displayAlert("alert", err.response.data.message || "Some error occured");   
            })

    }

    return (
        <div className="relative min-h-screen overflow-hidden">
            {
                alert &&
                <Alert alert={alert} />
            }
            {
                login &&
                <Login />
            }
            {
                signup &&
                <Signup />
            }


            <div className="updateTask hidden bg-black/40 absolute flex-col items-center justify-center w-full min-h-screen z-50 overflow-hidden">
                <form id="update-form" className="bg-white flex flex-col w-[90%] xs:w-[23rem] gap-4 px-4 xs:p-8 rounded-2xl" onSubmit={handleUpdateSubmit} method="POST">
                    <input type="text" onChange={(e) => setTitle(e.target.value)} value={title} name="title" placeholder="Enter Title" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <textarea type="text" onChange={(e) => setDescription(e.target.value)} value={description} name="description" placeholder="Enter Description" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <input type="date" onChange={e => setDueDate(e.target.value)} name="dueDate" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <select onChange={e => setStatus(e.target.value)} name="status" value={status} className="cursor-pointer py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm">
                        <option id="option" value="todo">Todo</option>
                        <option id="option" value="ongoing">Ongoing</option>
                        <option id="option" value="completed">Completed</option>
                        <option id="option" value="overdue">Overdue</option>
                    </select>
                    <select onChange={e => setPriority(e.target.value)} name="priority" value={priority} className="cursor-pointer py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm">
                        <option id="option" value="High">High</option>
                        <option id="option" value="Medium">Medium</option>
                        <option id="option" value="Low">Low</option>
                    </select>
                    <select onChange={e => setCategory(e.target.value)} name="category" value={category} className="cursor-pointer py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm">
                        <option id="option" value="personal">Personal</option>
                        <option id="option" value="design">Design</option>
                        <option id="option" value="development">Development</option>
                        <option id="option" value="research">Research</option>
                    </select>
                    <div className="flex items-center justify-center gap-4">
                        <button type="submit" className="text-white bg-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-white py-2 px-4 rounded-xl cursor-pointer">Update Task </button>
                        <div onClick={() => document.querySelector(".updateTask").style.display = "none"} className="bg-white text-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-white hover:bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer">Cancel</div>
                    </div>
                </form>
            </div>

            <NewTask token={token} displayAlert={displayAlert} />

            <div className="main overflow-y-auto xl:ml-[15rem] px-3 sm:px-4 lg:px-8 py-9 bg-white z-40 h-screen">
                <Header />
                {
                    loading && <div className="w-full h-full flex items-center justify-center">
                        <div className="w-4 h-4 border-[6px] animate-spin border-t-transparent border-[var(--accent-color)] p-6 rounded-[50%]">&nbsp;</div>
                    </div>
                }
                {
                    !loading && !login && !signup &&
                    <div className="w-full grid grid-cols-1 mt-12 sm:grid-cols-2 rounded-2xl md:flex gap-4 py-4 px-2 bg-[var(--primary-color)]">
                        <div className="flex flex-col gap-2 w-[100%] md:w-[25%]">
                            <div className="w-full flex justify-between bg-white p-2 rounded-xl">
                                <p>Todo</p>
                                <p><i className="fa-solid fa-ellipsis px-2"></i> <i className="fa-solid fa-square-plus"></i></p>
                            </div>
                            <div className="flex flex-col gap-2 z-0">
                                {
                                    todo.map((task) => (
                                        <div onClick={() => handleClick(task.priority)} id={task.priority} className="bg-white rounded-3xl p-2" key={task.id}>
                                            <Card task={task} removeTask={() => removeTask(task.id)} updateTask={() => updateTask(task.id)} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[100%] md:w-[25%]">
                            <div className="w-full flex justify-between bg-white p-2 rounded-xl">
                                <p>Ongoing</p>
                                <p><i className="fa-solid fa-ellipsis px-2"></i> <i className="fa-solid fa-square-plus"></i></p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {
                                    ongoing.map((task) => (
                                        <div onClick={() => handleClick(task.priority)} id={task.priority} className="rounded-3xl p-2" key={task.id}>
                                            <Card task={task} removeTask={() => removeTask(task.id)} updateTask={() => updateTask(task.id)} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[100%] md:w-[25%]">
                            <div className="w-full flex justify-between bg-white p-2 rounded-xl">
                                <p>Completed</p>
                                <p><i className="fa-solid fa-ellipsis px-2"></i> <i className="fa-solid fa-square-plus"></i></p>
                            </div>
                            <div className=" flex flex-col gap-2">
                                {
                                    completed.map((task) => (
                                        <div onClick={() => handleClick(task.priority)} id={task.priority} className="rounded-3xl p-2" key={task.id}>
                                            <Card task={task} removeTask={() => removeTask(task.id)} updateTask={() => updateTask(task.id)} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 w-[100%] md:w-[25%]">
                            <div className="w-full flex justify-between bg-white p-2 rounded-xl">
                                <p>Overdue</p>
                                <p><i className="fa-solid fa-ellipsis px-2"></i> <i className="fa-solid fa-square-plus"></i></p>
                            </div>
                            <div className=" flex flex-col gap-2">
                                {
                                    overdue.map((task) => (
                                        <div onClick={() => handleClick(task.priority)} id={task.priority} className="rounded-3xl p-2" key={task.id}>
                                            <Card task={task} removeTask={() => removeTask(task.id)} updateTask={() => updateTask(task.id)} />
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}