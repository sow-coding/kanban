"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface DeleteTaskType {
    deleteTask: boolean;
    setDeleteTask: Dispatch<SetStateAction<boolean>>
}

export const DeleteTaskContext = createContext<DeleteTaskType |null>(null)

export default function DeleteTaskContextProvider ({children}: UseContextHook) {
    const [deleteTask, setDeleteTask] = useState<boolean>(false)    
    return (
        <DeleteTaskContext.Provider value={{
            deleteTask: deleteTask,
            setDeleteTask: setDeleteTask
        }}>
            {children}
        </DeleteTaskContext.Provider>
    )
}

export function useDeleteTaskContext () {
    const context = useContext(DeleteTaskContext)
    if (!context) {
        throw new Error ("useDeleteTaskContext must be used within DeleteTaskContextProvider")
    }
    return context
}