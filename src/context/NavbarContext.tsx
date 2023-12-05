import { createContext, Dispatch, SetStateAction } from "react"

export const NavbarContext = createContext<[boolean, Dispatch<SetStateAction<boolean>>] | any[]>([])
