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
import EditBoard from "@/components/editBoard/editBoard";
import { EditBoardContext } from "@/context/EditBoardContext";
import EditTask from "@/components/editTask/editTask";
import { EditTaskContext } from "@/context/EditTaskContext";
import DeleteBoard from "@/components/deleteBoard/deleteBoard";
import { DeleteBoardContext } from "@/context/DeleteBoardContext";
import { OptionsContext } from "@/context/OptionsContext";

export default function Board() {

  interface Subtask {
    name?: string;
  }
  interface Task {
    title: string;
    description: string;
    substasks?: Subtask[]
  }
  interface ColumnType {
    name: string;
    tasks?: Task[]
  }

  interface Board {
    nameOfTheBoard: string;
    columns?: ColumnType[]
  }

  const [boards, setBoards] = useState<Board[]>([])
  const [theme, setTheme] = useState<boolean>(true)
  const [addBoard, setAddBoard] = useState<boolean>(false)
  const [navbarOff, setNavbarOff] = useState<boolean>(false)
  const [addColumn, setAddColumn] = useState<boolean>(false)
  const [addTask, setAddtask] = useState<boolean>(false)
  const [editBoard, setEditBoard] = useState<boolean>(false)
  const [editTask, setEditTask] = useState<boolean>(false)
  const [whichBoard, setWhichBoard] = useState<string>("")
  const [editedTask, setEditedTask] = useState<Task>({
    title: "",
    description: "",
    substasks: []
  })
  const [deleteBoard, setDeleteBoard] = useState<boolean>(false)
  const handleNewColumn = (boardIndex:number, newColumns: ColumnType[]) => {

    const updatedBoards: Board[] = [...boards];

    updatedBoards[boardIndex]?.columns?.push(...newColumns);

    setBoards(updatedBoards);
  };

  const boardIndex = boards.findIndex(board => board.nameOfTheBoard === whichBoard);
  const [taskIndex, setTaskIndex] = useState<number>(0)
  const [options, setOptions] = useState<boolean>(false)
  const [deleteTask, setDeleteTask] = useState<boolean>(false)

  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
    <BoardsContext.Provider value={[boards, setBoards]}>
    <AddBoardContext.Provider value={[addBoard, setAddBoard]}>
    <WhichBoardContext.Provider value={[whichBoard, setWhichBoard]}>
    <NavbarContext.Provider value={[navbarOff, setNavbarOff]}>
    <AddColumnContext.Provider value={[addColumn, setAddColumn]}>
    <AddTaskContext.Provider value={[addTask, setAddtask]}>
    <EditBoardContext.Provider value={[editBoard, setEditBoard]}>
    <EditTaskContext.Provider value={[editTask, setEditTask]}>
    <DeleteBoardContext.Provider value={[deleteBoard, setDeleteBoard]}>
    <OptionsContext.Provider value={[options, setOptions]}>
    <DeleteBoardContext.Provider value={[deleteTask, setDeleteTask]}>
    <div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
      <div className="kanbanApp" onClick={() => {setOptions(false)}}>
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
          board.nameOfTheBoard === whichBoard ? board?.columns?.map((column:ColumnType, index:number) => (
            <div key={index} className="column">
              <h6>{column.name}</h6>
              <ul>
                {column.tasks?.map((Task: Task, index: number) => (
                  <li key={index} onClick={() => {
                    setEditTask(true)
                    setEditedTask(Task)
                    setTaskIndex(index)
                  }}>
                    {Task.title}
                  </li>
                ))}
              </ul>
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
      {addTask && <AddNewTask boardIndex={boardIndex}/>}
      {editBoard && <EditBoard handleNewColumn={handleNewColumn} boardIndex={boardIndex} />}
      {editTask && <EditTask boardIndex={boardIndex} editedTask={editedTask} taskIndex={taskIndex}/>}
      {deleteBoard && <DeleteBoard boardIndex={boardIndex}/>}
    </div>
    </DeleteBoardContext.Provider>
    </OptionsContext.Provider>
    </DeleteBoardContext.Provider>
    </EditTaskContext.Provider>
    </EditBoardContext.Provider>
    </AddTaskContext.Provider>
    </AddColumnContext.Provider>
    </NavbarContext.Provider>
    </WhichBoardContext.Provider>
    </AddBoardContext.Provider>
    </BoardsContext.Provider>
    </ThemeContext.Provider>
  )
}
