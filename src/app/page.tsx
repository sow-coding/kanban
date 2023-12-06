"use client"
import Navbar from "@/components/navbar/navbar";
import { BoardsContext } from "@/context/BoardsContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useState, SetStateAction } from "react";
import AddBoard from '@/components/addBoard/addBoard'
import { AddBoardContext } from "@/context/AddBoardContext";
import { WhichBoardContext } from "@/context/WhichBoardContext";
import BoardNavbar from "@/components/boardNavbar/boardNavbar";
import { NavbarContext } from "@/context/NavbarContext";

export default function Board() {

  interface Board {
    nameOfTheBoard: string;
    columns?: string[]
  }

  const [boards, setBoards] = useState<Board[]>([])
  const [theme, setTheme] = useState<boolean>(false)
  const [addBoard, setAddBoard] = useState<boolean>(false)
  const [whichBoard, setWhichBoard] = useState<string>("")
  const [navbarOff, setNavbarOff] = useState<boolean>(false)
  const [newColumnName, setNewColumnName] = useState<string>("")

  
  const handleNewColumn = (boardIndex:number) => {

    const updatedBoards: Board[] = [...boards];

    updatedBoards[boardIndex].columns?.push(newColumnName);

    setBoards(updatedBoards);

    setNewColumnName('');
  };


  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <BoardsContext.Provider value={[boards, setBoards]}>
    <AddBoardContext.Provider value={[addBoard, setAddBoard]}>
    <WhichBoardContext.Provider value={[whichBoard, setWhichBoard]}>
    <NavbarContext.Provider value={[navbarOff, setNavbarOff]}>
    <div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
      <div className="kanbanApp">
      <BoardNavbar />
      {boards.length === 0 ? <div className="empty">
        <h3>This board is empty. Create a new column to get started.</h3>
        <div className="addNewColumn">
          <p>+ Add New Column</p>
        </div>
      </div> : <div className="columns">
        {boards.map((board:Board, index:number) => (
          board.nameOfTheBoard === whichBoard ? board.columns?.map((column:string, index:number) => (
            <div key={index} className="column">
              <h6>{column}</h6>
            </div>
          )) : null
        ))}  
      </div>}
      </div>
      {addBoard && <AddBoard />}
    </div>
    </NavbarContext.Provider>
    </WhichBoardContext.Provider>
    </AddBoardContext.Provider>
    </BoardsContext.Provider>
    </ThemeContext.Provider>
  )
}
