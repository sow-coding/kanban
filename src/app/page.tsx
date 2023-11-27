"use client"
import Navbar from "@/components/navbar/navbar";
import { BoardsContext } from "@/context/BoardsContext";
import { ThemeContext } from "@/context/ThemeContext";
import { useState } from "react";

export default function Board() {
  const [theme, setTheme] = useState<boolean>(false)
  const [boards, setBoards] = useState<any[]>([])

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <BoardsContext.Provider value={[boards, setBoards]}>
    <div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
    </div>
    </BoardsContext.Provider>
    </ThemeContext.Provider>
  )
}
