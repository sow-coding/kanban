"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface DeleteBoardType {
    deleteBoard: boolean;
    setDeleteBoard: Dispatch<SetStateAction<boolean>>
}

export const DeleteBoardContext = createContext<DeleteBoardType |null>(null)

export default function DeleteBoardContextProvider ({children}: UseContextHook) {
    const [deleteBoard, setDeleteBoard] = useState<boolean>(false)    
    return (
        <DeleteBoardContext.Provider value={{
            deleteBoard: deleteBoard,
            setDeleteBoard: setDeleteBoard
        }}>
            {children}
        </DeleteBoardContext.Provider>
    )
}

export function useDeleteBoardContext () {
    const context = useContext(DeleteBoardContext)
    if (!context) {
        throw new Error ("useDeleteBoardContext must be used within DeleteBoardContextProvider")
    }
    return context
}