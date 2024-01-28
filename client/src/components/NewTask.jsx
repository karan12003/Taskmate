import Reac, { useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setTasks } from '../store/taskSlice'

function NewTask({token, displayAlert }) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState(new Date())
    const [alert, setAlert] = useState(null)
    const [priority, setPriority] = useState("Medium")
    const [category, setCategory] = useState("personal")
    const [status, setStatus] = useState("todo")

    const dispatch = useDispatch();

    const tasks = useSelector(state=> state.taskmate.tasks)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/task", document.querySelector('#form'), {
            headers: {
                'authorization': token,
                'Content-Type': 'application/json'
            }
        }).then(res => {
            displayAlert("success", res.data.message)
            document.querySelector(".newTask").style.display = "none";
            dispatch(setTasks([...tasks,res.data.task]))
        })
            .catch(err => {
                displayAlert("alert", err.response.data.message || "Some error occured");
            })
    }

    return (
        <div className="newTask hidden bg-black/40 absolute flex-col items-center justify-center w-full h-screen z-50 overflow-hidden">
            <form id="form" className="bg-white flex flex-col w-[90%] xs:w-[23rem] gap-4 p-4 xs:p-8 rounded-2xl" onSubmit={handleSubmit} method="POST">
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
                    <button type="submit" className="text-white bg-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-white py-2 px-4 rounded-xl cursor-pointer">Create New Task </button>
                    <div onClick={() => document.querySelector(".newTask").style.display = "none"} className="bg-white text-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-white hover:bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer">Cancel</div>
                </div>
            </form>
        </div>
    )
}

export default NewTask
