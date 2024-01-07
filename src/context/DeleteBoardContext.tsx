import { createContext, Dispatch, SetStateAction } from "react"

export const DeleteBoardContext = createContext<[any[], Dispatch<SetStateAction<boolean>>] | any[]>([])