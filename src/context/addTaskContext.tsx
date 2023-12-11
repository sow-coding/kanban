import { createContext, Dispatch, SetStateAction } from "react"

export const AddTaskContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
