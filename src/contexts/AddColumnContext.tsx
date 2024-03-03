"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface AddColumnType {
    addColumn: boolean;
    setAddColumn: Dispatch<SetStateAction<boolean>>
}

export const AddColumnContext = createContext<AddColumnType |null>(null)

export default function AddColumnContextProvider ({children}: UseContextHook) {
    const [addColumn, setAddColumn] = useState<boolean>(false)    
    return (
        <AddColumnContext.Provider value={{
            addColumn: addColumn,
            setAddColumn: setAddColumn
        }}>
            {children}
        </AddColumnContext.Provider>
    )
}

export function useAddColumnContext () {
    const context = useContext(AddColumnContext)
    if (!context) {
        throw new Error ("useAddColumnContext must be used within AddColumnContextProvider")
    }
    return context
}