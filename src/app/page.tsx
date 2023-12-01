"use client"
import Navbar from "@/components/navbar/navbar";
import { BoardsContext } from "@/context/BoardsContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from "react";
import AddBoard from '@/components/addBoard/addBoard'
import { AddBoardContext } from "@/context/AddBoardContext";
import { WhichBoardContext } from "@/context/WhichBoardContext";

export default function Board() {
  
  const [theme, setTheme] = useState<boolean>(false)
  const [boards, setBoards] = useState<object[]>([])
  const [addBoard, setAddBoard] = useState<boolean>(false)
  const [whichBoard, setWhichBoard] = useState<string>("")

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <BoardsContext.Provider value={[boards, setBoards]}>
    <AddBoardContext.Provider value={[addBoard, setAddBoard]}>
    <WhichBoardContext.Provider value={[whichBoard, setWhichBoard]}>
    <div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
      {addBoard && <AddBoard />}
    </div>
    </WhichBoardContext.Provider>
    </AddBoardContext.Provider>
    </BoardsContext.Provider>
    </ThemeContext.Provider>
  )
}
