"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface ActualStatusType {
    actualStatus: string;
    setActualStatus: Dispatch<SetStateAction<string>>
}

export const ActualStatusContext = createContext<ActualStatusType |null>(null)

export default function ActualStatusContextProvider ({children}: UseContextHook) {
    const [actualStatus, setActualStatus] = useState("")
    return (
        <ActualStatusContext.Provider value={{
            actualStatus: actualStatus,
            setActualStatus: setActualStatus
        }}>
            {children}
        </ActualStatusContext.Provider>
    )
}

export function useActualStatusContext () {
    const context = useContext(ActualStatusContext)
    if (!context) {
        throw new Error ("useActualStatusContext must be used within ActualStatusContextProvider")
    }
    return context
}