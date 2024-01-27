import React from 'react'

function List({ task, updateTask, removeTask, taskID }) {

    let string = task.description;
    let description = "";

    if (string.length > 50) {
        string = string.substring(0, 50).split(" ")
        let pop = string.pop()
        for (let i in string) {
            description += string[i] + " ";
        }
        description += "..."
    }

    return (
        <div className="flex items-center gap-4 p-2 rounded-2xl relative z-10">
            <div className="hidden sm:flex w-[25%] md:w-[15%] items-center text-sm justify-between">
                <p>{task.dueDate?.split("T")[0] || task.dueDate}</p>
            </div>
            <div className="text-lg w-[85%] sm:w-[70%] md:w-[40%] lg:w-[35%] max-h-[4rem] overflow-hidden">
                <p>{task.title}</p>
            </div>
            <div className="text-sm hidden md:block w-[20%] lg:w-[15%] top-[75%] xl:top-[80%]">
                <p>{task.priority}</p>
            </div>
            <div className="text-sm hidden md:block w-[20%] lg:w-[15%] top-[75%] xl:top-[80%]">
                <p>{task.status}</p>
            </div>
            <div className="hidden lg:block text-sm w-[15%] top-[75%] xl:top-[80%]">
                <p>{task.category}</p>
            </div>
            <div className="w-[5%] flex items-center justify-end gap-2">
                <i onClick={() => updateTask(taskID)} className="fa-solid fa-pencil text-base cursor-pointer"></i>
                <i onClick={() => removeTask(taskID)} className="fa-regular fa-circle-xmark text-base cursor-pointer"></i>
            </div>
        </div>
    )
}

export default List
