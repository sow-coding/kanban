"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface TaskType {
    task: boolean;
    setTask: Dispatch<SetStateAction<boolean>>
}

export const TaskContext = createContext<TaskType |null>(null)

export default function TaskContextProvider ({children}: UseContextHook) {
    const [task, setTask] = useState<boolean>(false)    
    return (
        <TaskContext.Provider value={{
            task: task,
            setTask: setTask
        }}>
            {children}
        </TaskContext.Provider>
    )
}

export function useTaskContext () {
    const context = useContext(TaskContext)
    if (!context) {
        throw new Error ("useTaskContext must be used within TaskContextProvider")
    }
    return context
}