"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface NewColumnType {
    newColumn: boolean;
    setNewColumn: Dispatch<SetStateAction<boolean>>
}

export const NewColumnContext = createContext<NewColumnType |null>(null)

export default function NewColumnContextProvider ({children}: UseContextHook) {
    const [newColumn, setNewColumn] = useState<boolean>(false)    
    return (
        <NewColumnContext.Provider value={{
            newColumn: newColumn,
            setNewColumn: setNewColumn
        }}>
            {children}
        </NewColumnContext.Provider>
    )
}

export function useNewColumnContext () {
    const context = useContext(NewColumnContext)
    if (!context) {
        throw new Error ("useNewColumnContext must be used within NewColumnContextProvider")
    }
    return context
}