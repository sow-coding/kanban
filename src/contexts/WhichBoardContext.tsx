"use client"
import { UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface WhichBoardContextType {
    whichBoard: string
    setWhichBoard: Dispatch<SetStateAction<string>>
}

export const WhichBoardContext = createContext<WhichBoardContextType |null>(null)

export default function WhichBoardContextProvider ({children}: UseContextHook) {
    const [whichBoard, setWhichBoard] = useState<string>("")    
    return (
        <WhichBoardContext.Provider value={{
            whichBoard: whichBoard,
            setWhichBoard: setWhichBoard
        }}>
            {children}
        </WhichBoardContext.Provider>
    )
}

export function useWhichBoardContext () {
    const context = useContext(WhichBoardContext)
    if (!context) {
        throw new Error ("useWhichBoardContext must be used within WhichBoardContextProvider")
    }
    return context
}