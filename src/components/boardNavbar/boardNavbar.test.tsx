import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import BoardNavbar from "./boardNavbar"

describe("boardNavbar", () => {
    it("Should renders boardNavbar correctly", () => {
        render(<BoardNavbar />)
        const element = screen.getByTestId("boardNavbar")
        expect(element).toBeInTheDocument()
    })
})