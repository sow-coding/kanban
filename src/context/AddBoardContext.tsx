import { createContext, Dispatch, SetStateAction } from "react"

export const AddBoardContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
