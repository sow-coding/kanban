import { createContext, Dispatch, SetStateAction } from "react"

export const ThemeContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
