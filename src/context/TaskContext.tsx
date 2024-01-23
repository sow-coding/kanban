import { createContext, Dispatch, SetStateAction } from "react"

export const TaskContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
