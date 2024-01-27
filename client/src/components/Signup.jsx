import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios'
import Alert from './Alert';
import { useDispatch } from 'react-redux';
import { setLogin, setSignup } from '../store/tokenSlice';

function Signup() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("")
    const [alert, setAlert] = useState(null)
    const dispatch=useDispatch()
    const navigate=useNavigate();

    const displayAlert = (type, msg) => {
        setAlert({
            type: type,
            message: msg
        })
        setTimeout(() => {
            setAlert(null)
        }, 1000)
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auth/signup", document.querySelector("#signup-form"), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                console.log(res.data.message)
                displayAlert("success", res.data.message)
                dispatch(setSignup(false))
                dispatch(setLogin(true))
            })
            .catch(err => {
                console.log(err.response.data.message)
                displayAlert("alert", err.response.data.message || err.response.data.error.split(",")[0].split(":")[2] || err.response.data.message)
            })
    }

    return (
        <>
            {
                alert &&
                <Alert alert={alert} />
            }
            <div className="flex bg-black/40 absolute flex-col items-center justify-center w-full h-screen z-50 overflow-hidden">
                <form id="signup-form" className="bg-white flex flex-col items-center w-[90%] xs:w-[23rem] mx-4 gap-4 p-4 xs:p-8 rounded-2xl" onSubmit={handleSubmit} method="POST">
                    <h4 className="text-center text-2xl">Sign Up</h4>
                    <h4 className="text-center text-sm">Already have an account ? <span onClick={() => { dispatch(setLogin(true)); dispatch(setSignup(false));}} className="hover:underline cursor-pointer">SignIn</span> now</h4>
                    <div className="w-16 rounded-full overflow-hidden">
                        <img src={logo} className="w-full h-full object-cover" />
                    </div>
                    <input type="text" onChange={e => setName(e.target.value)} value={name} name="name" placeholder="Enter Name" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="username" placeholder="Enter Username" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Enter Password" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />

                    <div className="flex items-center justify-center gap-4">
                        <button type="submit" className="text-white bg-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-white py-2 px-4 rounded-xl cursor-pointer">Sign Up </button>
                        <div className="bg-white text-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-white hover:bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer" onClick={() => navigate("/")}>Cancel</div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Signup
