"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface AddTaskType {
    addTask: boolean;
    setAddTask: Dispatch<SetStateAction<boolean>>
}

export const AddTaskContext = createContext<AddTaskType |null>(null)

export default function AddTaskContextProvider ({children}: UseContextHook) {
    const [addTask, setAddTask] = useState<boolean>(false)    
    return (
        <AddTaskContext.Provider value={{
            addTask: addTask,
            setAddTask: setAddTask
        }}>
            {children}
        </AddTaskContext.Provider>
    )
}

export function useAddTaskContext () {
    const context = useContext(AddTaskContext)
    if (!context) {
        throw new Error ("useAddTaskContext must be used within AddTaskContextProvider")
    }
    return context
}