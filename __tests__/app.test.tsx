import {screen, render} from "@testing-library/react"
import "@testing-library/jest-dom"
import Board from "@/app/page"
import Navbar from "../src/components/navbar/navbar"
import user from "@testing-library/user-event"
import AddBoard from "../src/components/addBoard/addBoard"
import BoardStick from "../src/components/boardStick/boardStick"
import BoardsContextProvider from "@/contexts/BoardsContext"
import ActualStatusContextProvider from '@/contexts/ActualStatusContext'
import AddBoardContextProvider from '@/contexts/AddBoardContext'
import AddColumnContextProvider from '@/contexts/AddColumnContext'
import AddTaskContextProvider from '@/contexts/AddTaskContext'
import DeleteBoardContextProvider from '@/contexts/DeleteBoardContext'
import DeleteTaskContextProvider from '@/contexts/DeleteTaskContext'
import EditBoardContextProvider from '@/contexts/EditBoardContext'
import NavbarContextProvider from '@/contexts/NavbarContext'
import EditTaskContextProvider from '@/contexts/EditTaskContext'
import NewColumnContextProvider from '@/contexts/NewColumnContext'
import OptionsContextProvider from '@/contexts/OptionsContext'
import TaskContextProvider from '@/contexts/TaskContext'
import ThemeContextProvider from '@/contexts/ThemeContext'
import WhichBoardContextProvider from '@/contexts/WhichBoardContext'
import PhoneNavbarContextProvider from '@/contexts/PhoneNavbarContext'


describe("board", () => {
    it("should renders correctly", () => {
        render(
            <ActualStatusContextProvider>
            <AddBoardContextProvider>
            <AddColumnContextProvider>
            <BoardsContextProvider>
            <DeleteBoardContextProvider>
            <DeleteTaskContextProvider>
            <EditBoardContextProvider>
            <NavbarContextProvider>
            <EditTaskContextProvider>
            <NewColumnContextProvider>
            <OptionsContextProvider>
            <TaskContextProvider>
            <ThemeContextProvider>
            <WhichBoardContextProvider>
            <PhoneNavbarContextProvider>
            <AddTaskContextProvider>
                <Board/>
            </AddTaskContextProvider>
            </PhoneNavbarContextProvider>
            </WhichBoardContextProvider>
            </ThemeContextProvider>
            </TaskContextProvider>
            </OptionsContextProvider>
            </NewColumnContextProvider>
            </EditTaskContextProvider>
            </NavbarContextProvider>
            </EditBoardContextProvider>
            </DeleteTaskContextProvider>
            </DeleteBoardContextProvider>
            </BoardsContextProvider>
            </AddColumnContextProvider>
            </AddBoardContextProvider>
            </ActualStatusContextProvider>)
        const element = screen.getByTestId("board")
        expect(element).toBeInTheDocument()
    })
})

describe("navbar", () => {
    it("should renders correctly", () => {
        render(
            <ActualStatusContextProvider>
            <AddBoardContextProvider>
            <AddColumnContextProvider>
            <BoardsContextProvider>
            <DeleteBoardContextProvider>
            <DeleteTaskContextProvider>
            <EditBoardContextProvider>
            <NavbarContextProvider>
            <EditTaskContextProvider>
            <NewColumnContextProvider>
            <OptionsContextProvider>
            <TaskContextProvider>
            <ThemeContextProvider>
            <WhichBoardContextProvider>
            <PhoneNavbarContextProvider>
            <AddTaskContextProvider>
                <Navbar/>
            </AddTaskContextProvider>
            </PhoneNavbarContextProvider>
            </WhichBoardContextProvider>
            </ThemeContextProvider>
            </TaskContextProvider>
            </OptionsContextProvider>
            </NewColumnContextProvider>
            </EditTaskContextProvider>
            </NavbarContextProvider>
            </EditBoardContextProvider>
            </DeleteTaskContextProvider>
            </DeleteBoardContextProvider>
            </BoardsContextProvider>
            </AddColumnContextProvider>
            </AddBoardContextProvider>
            </ActualStatusContextProvider>
        )
        const element = screen.getByTestId("navbar")
        expect(element).toBeInTheDocument()
    })
    it("should change the app mode when I click on the button for", async () => {
       user.setup()
       render(
        <ActualStatusContextProvider>
            <AddBoardContextProvider>
            <AddColumnContextProvider>
            <BoardsContextProvider>
            <DeleteBoardContextProvider>
            <DeleteTaskContextProvider>
            <EditBoardContextProvider>
            <NavbarContextProvider>
            <EditTaskContextProvider>
            <NewColumnContextProvider>
            <OptionsContextProvider>
            <TaskContextProvider>
            <ThemeContextProvider>
            <WhichBoardContextProvider>
            <PhoneNavbarContextProvider>
            <AddTaskContextProvider>
                <Board/>
            </AddTaskContextProvider>
            </PhoneNavbarContextProvider>
            </WhichBoardContextProvider>
            </ThemeContextProvider>
            </TaskContextProvider>
            </OptionsContextProvider>
            </NewColumnContextProvider>
            </EditTaskContextProvider>
            </NavbarContextProvider>
            </EditBoardContextProvider>
            </DeleteTaskContextProvider>
            </DeleteBoardContextProvider>
            </BoardsContextProvider>
            </AddColumnContextProvider>
            </AddBoardContextProvider>
            </ActualStatusContextProvider>
       )
       const button = screen.getAllByTestId("changeModeBouton");
       const board = screen.getByTestId("board");
       await user.click(button[0])
       expect(board).toHaveAttribute('data-theme', "dark")
       await user.click(button[0])
       expect(board).toHaveAttribute("data-theme", "light")
    })
})

describe('addBoard', () => {
    it("should renders addBoard correctly", () => {
        render(
            <ActualStatusContextProvider>
            <AddBoardContextProvider>
            <AddColumnContextProvider>
            <BoardsContextProvider>
            <DeleteBoardContextProvider>
            <DeleteTaskContextProvider>
            <EditBoardContextProvider>
            <NavbarContextProvider>
            <EditTaskContextProvider>
            <NewColumnContextProvider>
            <OptionsContextProvider>
            <TaskContextProvider>
            <ThemeContextProvider>
            <WhichBoardContextProvider>
            <PhoneNavbarContextProvider>
            <AddTaskContextProvider>
                <AddBoard/>
            </AddTaskContextProvider>
            </PhoneNavbarContextProvider>
            </WhichBoardContextProvider>
            </ThemeContextProvider>
            </TaskContextProvider>
            </OptionsContextProvider>
            </NewColumnContextProvider>
            </EditTaskContextProvider>
            </NavbarContextProvider>
            </EditBoardContextProvider>
            </DeleteTaskContextProvider>
            </DeleteBoardContextProvider>
            </BoardsContextProvider>
            </AddColumnContextProvider>
            </AddBoardContextProvider>
            </ActualStatusContextProvider>
        )
        const element = screen.getByTestId("addBoard")
        expect(element).toBeInTheDocument()
    })
})

describe('boardStick', () => {
    it("should renders boardStick correctly", async () => {
        render(
            <ActualStatusContextProvider>
            <AddBoardContextProvider>
            <AddColumnContextProvider>
            <BoardsContextProvider>
            <DeleteBoardContextProvider>
            <DeleteTaskContextProvider>
            <EditBoardContextProvider>
            <NavbarContextProvider>
            <EditTaskContextProvider>
            <NewColumnContextProvider>
            <OptionsContextProvider>
            <TaskContextProvider>
            <ThemeContextProvider>
            <WhichBoardContextProvider>
            <PhoneNavbarContextProvider>
            <AddTaskContextProvider>
                <BoardStick/>
            </AddTaskContextProvider>
            </PhoneNavbarContextProvider>
            </WhichBoardContextProvider>
            </ThemeContextProvider>
            </TaskContextProvider>
            </OptionsContextProvider>
            </NewColumnContextProvider>
            </EditTaskContextProvider>
            </NavbarContextProvider>
            </EditBoardContextProvider>
            </DeleteTaskContextProvider>
            </DeleteBoardContextProvider>
            </BoardsContextProvider>
            </AddColumnContextProvider>
            </AddBoardContextProvider>
            </ActualStatusContextProvider>
        )
        const element = screen.getByTestId("boardStick")
        expect(element).toBeInTheDocument()
    })
})