import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import AddBoard from "./addBoard"

describe('addBoard', () => {
    it("should renders addBoard correctly", () => {
        render(<AddBoard />)
        const element = screen.getByTestId("addBoard")
        expect(element).toBeInTheDocument()
    })
})