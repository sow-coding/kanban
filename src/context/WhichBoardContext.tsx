import { createContext, Dispatch, SetStateAction } from "react"

export const WhichBoardContext = createContext<[string, Dispatch<SetStateAction<string>>] | any>("")
