"use client"
import { Board, UseContextHook } from "@/app/page"
import { createContext, Dispatch, SetStateAction, useContext, useState } from "react"

interface BoardContextType {
    boards: Board[]
    setBoards: Dispatch<SetStateAction<Board[]>>
}

export const BoardsContext = createContext<BoardContextType |null>(null)

export default function BoardsContextProvider ({children}: UseContextHook) {
    const [boards, setBoards] = useState<Board[]>([])    
    return (
        <BoardsContext.Provider value={{
            boards: boards,
            setBoards: setBoards
        }}>
            {children}
        </BoardsContext.Provider>
    )
}

export function useBoardsContext () {
    const context = useContext(BoardsContext)
    if (!context) {
        throw new Error ("useBoardsContext must be used within BoardsContextProvider")
    }
    return context
}