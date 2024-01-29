import { createContext, Dispatch, SetStateAction } from "react"

export const ActualStatusContext = createContext<[string, Dispatch<SetStateAction<string>>] | any[]>([])
