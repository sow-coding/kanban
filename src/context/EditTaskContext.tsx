import { createContext, Dispatch, SetStateAction } from "react"

export const EditTaskContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
