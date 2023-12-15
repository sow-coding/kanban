import { createContext, Dispatch, SetStateAction } from "react"

export const EditBoardContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
