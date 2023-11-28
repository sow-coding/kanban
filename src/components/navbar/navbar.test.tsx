import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import Navbar from "./navbar"
import user from "@testing-library/user-event"
import Board from "@/app/page"

describe("navbar", () => {
    it("should renders correctly", () => {
        render(<Navbar />)
        const element = screen.getByTestId("navbar")
        expect(element).toBeInTheDocument()
    })
    it("should change the app mode when i click on the button for", async () => {
       user.setup()
       render(<Board />)
       const button = screen.getByTestId("changeModeBtn");
       const board = screen.getByTestId("board");
       await user.click(button)
       expect(board).toHaveAttribute('data-theme', "dark")
       await user.click(button)
       expect(board).toHaveAttribute("data-theme", "light")
    })
})