import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import Board from "@/app/page"


describe("board", () => {
    it("should renders correctly", () => {
        render(<Board />)
        const element = screen.getByTestId("board")
        expect(element).toBeInTheDocument()
    })
})