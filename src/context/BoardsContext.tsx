import { createContext, Dispatch, SetStateAction } from "react"

export const BoardsContext = createContext<[any[], Dispatch<SetStateAction<boolean>>] | any[]>([])