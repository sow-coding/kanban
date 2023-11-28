import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import BoardStick from "./boardStick"


describe('boardStick', () => {
    it("should renders boardStick correctly", async () => {
        render(<BoardStick />)
        const element = screen.getByTestId("boardStick")
        expect(element).toBeInTheDocument()
    })
})