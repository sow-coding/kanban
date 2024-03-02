"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface EditBoardType {
    editBoard: boolean;
    setEditBoard: Dispatch<SetStateAction<boolean>>
}

export const EditBoardContext = createContext<EditBoardType |null>(null)

export default function EditBoardContextProvider ({children}: UseContextHook) {
    const [editBoard, setEditBoard] = useState<boolean>(false)    
    return (
        <EditBoardContext.Provider value={{
            editBoard: editBoard,
            setEditBoard: setEditBoard
        }}>
            {children}
        </EditBoardContext.Provider>
    )
}

export function useEditBoardContext () {
    const context = useContext(EditBoardContext)
    if (!context) {
        throw new Error ("useEditBoardContext must be used within EditBoardContextProvider")
    }
    return context
}