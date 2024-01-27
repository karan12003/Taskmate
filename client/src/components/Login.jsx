import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios'
import Alert from './Alert';
import { useDispatch } from 'react-redux';
import { setName, setToken, setUser } from '../store/tokenSlice';
import { setLogin, setSignup } from '../store/tokenSlice';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const displayAlert = (type, msg) => {
        setAlert({
            type: type,
            message: msg
        })
        setTimeout(() => {
            setAlert(null)
        }, 1500)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("/auth/login", document.querySelector("#login-form"), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                dispatch(setName(res.data.name))
                dispatch(setUser(res.data.username))
                dispatch(setToken(res.data.token))
                displayAlert("success", res.data.message)
            })
            .then(()=>{
                setTimeout(()=>{
                    dispatch(setLogin(false))
                    dispatch(setSignup(false))
                },500)

            })
            .catch(err => {
                displayAlert("alert", err.response.data.message || err.message)
            })
    }

    return (
        <>
            {
                alert && <Alert alert={alert} />
            }
            <div className="flex bg-black/40 absolute flex-col items-center justify-center w-full h-screen z-50 overflow-hidden">
                <form id="login-form" className="bg-white flex flex-col items-center w-[90%] xs:w-[23rem] gap-4 p-8 rounded-2xl" onSubmit={handleSubmit} method="POST">
                    <h4 className="text-center text-2xl">Sign In</h4>
                    <h4 className="text-center text-sm">Don't have an account ? <span onClick={() => { dispatch(setLogin(false)); dispatch(setSignup(true)) }} className="hover:underline cursor-pointer">SignUp</span> now</h4>
                    <div className="w-16 rounded-full overflow-hidden">
                        <img src={logo} className="w-full h-full object-cover" />
                    </div>
                    <input type="text" onChange={(e) => setUsername(e.target.value)} value={username} name="username" placeholder="Enter Username" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />
                    <input type="password" onChange={(e) => setPassword(e.target.value)} value={password} name="password" placeholder="Enter Password" className="py-2 px-4 outline-2 outline-orange-400 shadow-[#0000004f] rounded-xl shadow-sm" />

                    <div className="flex items-center justify-center gap-4">
                        <button type="submit" className="text-white bg-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-white py-2 px-4 rounded-xl cursor-pointer">Sign In </button>
                        <div onClick={() => {navigate("/");displayAlert("alert", "Kindly Login to proceed")}} className="bg-white text-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-white hover:bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer">Cancel</div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
