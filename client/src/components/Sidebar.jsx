import React, { useEffect } from 'react'
import logo from '../assets/logo.png'
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Sidebar() {

    const navigate = useNavigate();
    const pathname =location.pathname.split("/").pop();

    const credentials = JSON.parse(localStorage.getItem("credentials"))
    const name = credentials?.name
    const user = credentials?.username

    const sidebarToggle = () => {
        const sidebar = document.querySelector(".sidebar")
        let flag = true;
        for (let i in sidebar.classList) {
            if (sidebar.classList[i] === "activeSidebar") {
                flag = false;
                break
            }
        }
        if (flag)
            sidebar.classList.add("activeSidebar")
        else
            sidebar.classList.remove("activeSidebar")
    }

    const menuToggle = () => {
        
        if (pathname!==""){
            document.querySelector(".menuActive").classList.remove("menuActive")
            document.querySelector(`#${pathname}`).classList.add("menuActive")
        }
        else{
            document.querySelector(".menuActive").classList.remove("menuActive")
            document.querySelector(`#overview`).classList.add("menuActive")
        }

    }

    const active = (params) => {
        const ul = document.querySelectorAll(`.sidebar .${params} li`);
        const i = document.querySelector(`.sidebar .${params} i`)

        ul.forEach((li) => {
            li.style.transform = li.style.transform === "translateY(-15rem)" ? "translateY(0rem)" : "translateY(-15rem)";
            li.style.transition = "all ease 0.3s";
        })

        i.style.transform = i.style.transform === "rotate(-90deg)" ? "rotate(0deg)" : "rotate(-90deg)";

        i.style.transition = "all ease 0.3s"
    }
    
    setTimeout(menuToggle,10)

    return (
        <>
            <div onClick={sidebarToggle} className="sidebar-toggle absolute z-50 left-[1rem] md:left-[12rem] py-10 top-[0%] text-lg xl:hidden">
                <i className="fa-solid fa-bars-staggered"></i>
            </div>
            <div className="sidebar overflow-y-auto fixed flex flex-col gap-2 md:gap-3 text-[var(--text-color)] w-[15rem] py-6 bg-[var(--primary-color)] min-h-screen z-[45]">
                <div className="px-4 pt-3">
                    <p className="font-bold text-3xl text-center md:text-start transition-all duration-300 ease-in-out text-[#2e2e2e]"><span>Task</span>mate</p>
                    <p>Focus. Prioritize. Execute</p>
                </div>
                <div className="flex items-center gap-2 mx-3 my-1 px-2 py-2 border-[1.6px] border-[#c4c3c3] rounded-xl">
                    <div className="w-12 rounded-full overflow-hidden">
                        <img src={logo} className="w-full h-full object-cover" />
                    </div>
                    <div >
                        <p className="text-[#2e2e2e] font-semibold text-[0.9rem] ">{name}</p>
                        <p className="text-xs">{user}</p>
                    </div>
                </div>
                <div className="menu">
                    <div onClick={() => active('menu')} className="flex items-center justify-between px-4 py-2 hover:bg-[#85858522] cursor-pointer">
                        <p>Menu</p>
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <ul className="flex flex-col gap-1 overflow-hidden px-4 md:pt-1">
                        <li onClick={() => { menuToggle(); navigate("/") }} className="menuActive" id="overview">
                            <p><i className="fa-solid fa-border-all"></i></p>
                            <p>Overview</p>
                        </li>
                        <li onClick={() => { menuToggle(); navigate("/tasklist") }} id="tasklist">
                            <p><i className="fa-solid fa-list"></i></p>
                            <p>Task List</p>
                        </li>
                        {/* <li onClick={() => {navigate("/")}} id="calendar">
                            <p><i className="fa-solid fa-calendar-days"></i></p>
                            <p>Calendar</p>
                        </li> */}
                        <li onClick={() => { menuToggle(); navigate("/settings") }} id="settings">
                            <p><i className="fa-solid fa-gear"></i></p>
                            <p>Settings</p>
                        </li>
                    </ul>
                </div>
                <div className="list">
                    <div onClick={() => active('list')} className="flex items-center justify-between px-4 py-2 hover:bg-[#85858522] cursor-pointer">
                        <p>List</p>
                        <i className="fa-solid fa-chevron-down" />
                    </div>
                    <ul className="flex flex-col gap-1 overflow-hidden px-4 pt-1">
                        <li onClick={() => { menuToggle(); navigate("/tasklist/personal") }} id="personal">
                            <p>😎</p>
                            <p>Personal</p>
                        </li>
                        <li onClick={() => { menuToggle(); navigate("/tasklist/design") }} id="design">
                            <p>🎨</p>
                            <p>Design</p>
                        </li>
                        <li onClick={() => { menuToggle(); navigate("/tasklist/development") }} id="development">
                            <p>💻</p>
                            <p>Development</p>
                        </li>
                        <li onClick={() => { menuToggle(); navigate("/tasklist/research") }} id="research">
                            <p>📝</p>
                            <p>Research</p>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar
