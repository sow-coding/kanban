"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface AddBoardType {
    addBoard: boolean;
    setAddBoard: Dispatch<SetStateAction<boolean>>
}

export const AddBoardContext = createContext<AddBoardType |null>(null)

export default function AddBoardContextProvider ({children}: UseContextHook) {
    const [addBoard, setAddBoard] = useState<boolean>(false)    
    return (
        <AddBoardContext.Provider value={{
            addBoard: addBoard,
            setAddBoard: setAddBoard
        }}>
            {children}
        </AddBoardContext.Provider>
    )
}

export function useAddBoardContext () {
    const context = useContext(AddBoardContext)
    if (!context) {
        throw new Error ("useAddBoardContext must be used within AddBoardContextProvider")
    }
    return context
}