import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { setTasks } from '../store/taskSlice';

function Header() {

    const dispatch =useDispatch();
    const tasks = useSelector(state => state.taskmate.tasks)

    const sortDateAsc = ()=>{
        dispatch(setTasks(_.sortBy(tasks,['dueDate'],['asc'])))
    }
    
    const sortDateDesc = ()=>{
        dispatch(setTasks(_.orderBy(tasks,['dueDate'],['desc'])))
    }
    
    const sortPriorityAsc = ()=>{
        dispatch(setTasks(_.sortBy(tasks,['priority'],['asc'])))
    }
    
    const sortPriorityDesc = ()=>{
        dispatch(setTasks(_.orderBy(tasks,['priority'],['desc'])))
    }

    return (

        <div className="fixed top-0 left-0 xl:left-[15rem] z-40 flex items-center justify-between bg-white px-12 pt-9 pb-4 w-full xl:w-[82.5%] text-sm text-[var(--icon-color)]">
            <div onClick={() => document.querySelector(".newTask").style.display = "flex"} className="text-white bg-[var(--accent-color)] py-2 px-4 rounded-xl cursor-pointer flex items-center gap-2   "><p>New Task</p> <i className="fa-solid fa-chevron-down text-white"></i></div>
            <ul className="flex items-center gap-4">
                <li className="dropdown translate-x-[1.5rem] md:translate-x-0 flex items-center gap-4 md:gap-8 border-[1.6px] border-[#c4c3c3] rounded-xl py-[0.375rem] px-4 md:px-2 md:py-1 cursor-pointer">
                    <div className="">
                        <div className="dropbtn">Sort</div>
                        <div className="dropcontent">
                            <p onClick={sortDateAsc}><span>Date</span> <i className="fa-solid fa-arrow-down"></i></p>
                            <p onClick={sortDateDesc}><span>Date</span> <i className="fa-solid fa-arrow-up"></i></p>
                            <p onClick={sortPriorityAsc}><span>Priority</span> <i className="fa-solid fa-arrow-up"></i></p>
                            <p onClick={sortPriorityDesc}><span>Priority</span> <i className="fa-solid fa-arrow-down"></i></p>
                        </div>
                        </div>
                    <i className="fa-solid fa-chevron-down"></i>
                </li>
            </ul>
        </div>

    )
}

export default Header
