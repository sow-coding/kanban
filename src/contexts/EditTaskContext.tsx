"use client"
import { UseContextHook } from "@/app/page"
import Task from "@/components/task/task";
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface EditTaskType {
    editTask: boolean;
    setEditTask: Dispatch<SetStateAction<boolean>>
}

export const EditTaskContext = createContext<EditTaskType |null>(null)

export default function EditTaskContextProvider ({children}: UseContextHook) {
    const [editTask, setEditTask] = useState<boolean>(false)   
    return (
        <EditTaskContext.Provider value={{
            editTask: editTask,
            setEditTask: setEditTask
        }}>
            {children}
        </EditTaskContext.Provider>
    )
}

export function useEditTaskContext () {
    const context = useContext(EditTaskContext)
    if (!context) {
        throw new Error ("useEditTaskContext must be used within EditTaskContextProvider")
    }
    return context
}