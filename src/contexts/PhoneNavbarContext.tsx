"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface PhoneNavbarContextType {
    phoneNavbarOff: boolean;
    setPhoneNavbarOff: Dispatch<SetStateAction<boolean>>
}

export const PhoneNavbarContext = createContext<PhoneNavbarContextType |null>(null)

export default function PhoneNavbarContextProvider ({children}: UseContextHook) {
    const [phoneNavbarOff, setPhoneNavbarOff] = useState<boolean>(false) 
        return (
            <PhoneNavbarContext.Provider value={{
                phoneNavbarOff: phoneNavbarOff,
                setPhoneNavbarOff: setPhoneNavbarOff
            }}>
                {children}
            </PhoneNavbarContext.Provider>
        )
}

export function usePhoneNavbarContext () {
    const context = useContext(PhoneNavbarContext)
    if (!context) {
        throw new Error ("usePhoneNavbarContext must be used within PhoneNavbarContextProvider")
    }
    return context
}