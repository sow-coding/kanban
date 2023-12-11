"use client"
import Navbar from "@/components/navbar/navbar";
import { BoardsContext } from "@/context/BoardsContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import AddBoard from '@/components/addBoard/addBoard'
import { AddBoardContext } from "@/context/AddBoardContext";
import { WhichBoardContext } from "@/context/WhichBoardContext";
import BoardNavbar from "@/components/boardNavbar/boardNavbar";
import { NavbarContext } from "@/context/NavbarContext";
import AddColumn from "@/components/addColumn/addColumn";
import { AddColumnContext } from "@/context/AddColumnContext";
import AddNewTask from "@/components/addNewTask/addNewTask";
import { AddTaskContext } from "@/context/addTaskContext";

export default function Board() {

  interface Board {
    nameOfTheBoard: string;
    columns?: string[]
    //columsSets sur un Column type qui a genre Name et apres Task qui est object avec name etc
  }

  const [boards, setBoards] = useState<Board[]>([])
  const [theme, setTheme] = useState<boolean>(true)
  const [addBoard, setAddBoard] = useState<boolean>(false)
  const [whichBoard, setWhichBoard] = useState<string>("")
  const [navbarOff, setNavbarOff] = useState<boolean>(false)
  const [addColumn, setAddColumn] = useState<boolean>(false)
  const [addTask, setAddtask] = useState<boolean>(false)

  const handleNewColumn = (boardIndex:number, newColumns: string[]) => {

    const updatedBoards: Board[] = [...boards];

    updatedBoards[boardIndex]?.columns?.push(...newColumns);

    setBoards(updatedBoards);
  };

  const boardIndex = boards.findIndex(board => board.nameOfTheBoard === whichBoard);

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <BoardsContext.Provider value={[boards, setBoards]}>
    <AddBoardContext.Provider value={[addBoard, setAddBoard]}>
    <WhichBoardContext.Provider value={[whichBoard, setWhichBoard]}>
    <NavbarContext.Provider value={[navbarOff, setNavbarOff]}>
    <AddColumnContext.Provider value={[addColumn, setAddColumn]}>
    <AddTaskContext.Provider value={[addTask, setAddtask]}>
    <div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
      <div className="kanbanApp">
      <BoardNavbar />
      {boards.length === 0 ? <div className="empty">
        <h3>Create a new board to get started.</h3>
        <div className="addNewBoard" onClick={() => {
          setAddBoard(true)
        }}>
          <p>+ Add New Board</p>
        </div>
      </div> : <div className="columns">
        {boards.map((board:Board) => (
          board.nameOfTheBoard === whichBoard ? board.columns?.map((column:string, index:number) => (
            <div key={index} className="column">
              <h6>{column}</h6>
            </div>
          )) : null
        ))}
        {
          whichBoard !== "" ? <div className="newColumn" onClick={() => {
            setAddColumn(true)
          }}>
              <h2>+ New Column</h2>
          </div>  : <div className="clickBoard">
            <h1>You{`'`}ve just created your first board, click on it by the sidebar at the left ;{`)`}</h1>
          </div>
        }
      </div>}
      </div>
      {addBoard && <AddBoard />}
      {addColumn && <AddColumn handleNewColumn={handleNewColumn} boardIndex={boardIndex}/>}
      {addTask && <AddNewTask/>}
    </div>
    </AddTaskContext.Provider>
    </AddColumnContext.Provider>
    </NavbarContext.Provider>
    </WhichBoardContext.Provider>
    </AddBoardContext.Provider>
    </BoardsContext.Provider>
    </ThemeContext.Provider>
  )
}
