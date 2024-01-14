import { createContext, Dispatch, SetStateAction } from "react"

export const DeleteTaskContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
