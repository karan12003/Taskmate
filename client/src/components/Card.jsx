import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import arrow from '../assets/arrow1.svg'

function Card({ task,updateTask, removeTask,taskID }) {

  let string = task.description;
  let description = "";

  if (string.length > 30) {
    string = string.substring(0, 30).split(" ")
    let pop = string.pop()
    for (let i in string) {
      description += string[i] + " ";
    }
    description += "..."
  }

  return (
    <div className="flex flex-col gap-4 p-2 rounded-2xl h-[10rem] relative z-10">
      <div className="flex items-center text-sm justify-between">
        <p>{task.dueDate?.split("T")[0] || task.dueDate}</p>
        <div className="w-8 flex items-center gap-2">
          <i onClick={()=>updateTask(taskID)} className="fa-solid fa-pencil text-base cursor-pointer"></i>
          <i onClick={()=>removeTask(taskID)} className="fa-regular fa-circle-xmark text-base cursor-pointer"></i>
        </div>
      </div>
      <div className="text-2xl w-[90%] max-h-[4rem] overflow-hidden">
        <p>{task.title}</p>
      </div>
      <div className="text-sm w-[90%] absolute top-[75%] xl:top-[80%]">
        <p>{description || string}</p>
      </div>
    </div>
  )
}

export default Card
