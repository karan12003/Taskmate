import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'
import axios from 'axios'
import Alert from './Alert';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../store/tokenSlice';
import { setLogin, setSignup } from '../store/tokenSlice';

function Login() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [alert, setAlert] = useState(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const token = useSelector(state => state.auth.token)
    const name =useSelector(state => state.auth.name)
    const user =useSelector(state => state.auth.user)

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
        axios.post("/auth/logout", document.querySelector("#logout-form"), {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                displayAlert("success", res.data.message)
                dispatch(setToken(""))
                navigate("/")
            })
            .then(() => {
                setTimeout(() => {
                    dispatch(setLogin(true))
                    dispatch(setSignup(false))
                }, 250)
            })
            .catch(err => {
                displayAlert("alert", err.response.data.message || err.message)
                console.log(err.response.data.message)
            })
    }

    return (
        <>
            {
                alert && <Alert alert={alert} />
            }
            <div className="flex flex-col items-center justify-center z-50 overflow-hidden py-16">
                <form id="logout-form" className="bg-white flex flex-col items-center w-[90%] xs:w-[23rem] gap-4 p-8 rounded-2xl" onSubmit={handleSubmit} method="POST">
                    <h4 className="text-center text-2xl">Sign Out</h4>
                    <h4 className="text-center text-sm">Changed your mind ? <span onClick={() => { navigate("/") }} className="hover:underline cursor-pointer">Go back</span> now</h4>
                    
                        <div className="text-center flex flex-col items-center gap-3">
                        <div className="w-16 rounded-full overflow-hidden">
                            <img src={logo} className="w-full h-full object-cover" />
                        </div>
                            <p className="text-[#2e2e2e] font-semibold text-xl ">{name}</p>
                            <input className='hidden' name="username" value={user} readOnly />
                            <p className="text-sm">{user}</p>
                        </div>
                    
                    <div className="flex items-center justify-center gap-4">
                        <button type="submit" className="text-white bg-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-[var(--accent-color)] hover:bg-white py-2 px-4 rounded-xl cursor-pointer">Sign Out </button>
                        <div onClick={() => navigate("/")} className="bg-white text-[var(--accent-color)] transition-all ease-in-out duration-300 border-2 border-[var(--accent-color)] hover:text-white hover:bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer">Cancel</div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
