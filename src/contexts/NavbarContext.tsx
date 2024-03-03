"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface NavbarContextType {
    navbarOff: boolean;
    setNavbarOff: Dispatch<SetStateAction<boolean>>
}

export const NavbarContext = createContext<NavbarContextType |null>(null)

export default function NavbarContextProvider ({children}: UseContextHook) {
    const [navbarOff, setNavbarOff] = useState<boolean>(false) 
        return (
            <NavbarContext.Provider value={{
                navbarOff: navbarOff,
                setNavbarOff: setNavbarOff
            }}>
                {children}
            </NavbarContext.Provider>
        )
}

export function useNavbarContext () {
    const context = useContext(NavbarContext)
    if (!context) {
        throw new Error ("useNavbarContext must be used within NavbarContextProvider")
    }
    return context
}