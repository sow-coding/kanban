import { createContext, Dispatch, SetStateAction } from "react"

export const OptionsContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
