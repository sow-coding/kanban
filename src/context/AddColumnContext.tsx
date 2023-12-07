import { createContext, Dispatch, SetStateAction } from "react"

export const AddColumnContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
