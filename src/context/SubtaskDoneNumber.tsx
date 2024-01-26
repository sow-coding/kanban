import { createContext, Dispatch, SetStateAction } from "react"

export const SubtaskDoneNumberContext = createContext<[any[], Dispatch<SetStateAction<boolean>>] | any[]>([])