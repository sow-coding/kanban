"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface OptionsType {
    options: boolean;
    setOptions: Dispatch<SetStateAction<boolean>>
}

export const OptionsContext = createContext<OptionsType |null>(null)

export default function OptionsContextProvider ({children}: UseContextHook) {
    const [options, setOptions] = useState<boolean>(false)    
    return (
        <OptionsContext.Provider value={{
            options: options,
            setOptions: setOptions
        }}>
            {children}
        </OptionsContext.Provider>
    )
}

export function useOptionsContext () {
    const context = useContext(OptionsContext)
    if (!context) {
        throw new Error ("useOptionsContext must be used within OptionsContextProvider")
    }
    return context
}