import { createContext, Dispatch, SetStateAction } from "react"

export const NewColumnContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
