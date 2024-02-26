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
import DeleteTask from "@/components/deleteTask/deleteTask";
import { DeleteTaskContext } from "@/context/DeleteTaskContext";
import { NewColumnContext } from "@/context/NewColumnContext";
import { TaskContext } from "@/context/TaskContext";
import Task from "@/components/task/task";
import { ActualStatusContext } from "@/context/ActualStatusContext";

export interface Subtask {
  name: string;
}
export interface TaskType {
  title: string;
  description: string;
  subtasks?: Subtask[];
  doneNumber?: number;
}
export interface ColumnType {
  name: string;
  tasks?: TaskType[]
}
export interface Board {
  nameOfTheBoard: string;
  columns?: ColumnType[]
}

export default function Board() {

  //refaire context
  //enlever bug column color avec getRandomColor
  //rajouter logo version tel + menu calc + barrer task when done + reduire taille btn addNewTask
  //enlever zoom iphone

  const [boards, setBoards] = useState<Board[]>([])
  const [theme, setTheme] = useState<boolean>(false)
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
    subtasks: []
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
  const [newColumn, setNewColumn] = useState<boolean>(false)
  const [task, setTask] = useState<boolean>(false)
  const [taskDisplay, setTaskDisplay] = useState({
    title: "",
    description: ""
  })
  const getRandomColor = () => {
    const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#EA5555"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const [actualStatus, setActualStatus] = useState("")

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
    <DeleteTaskContext.Provider value={[deleteTask, setDeleteTask]}>
    <NewColumnContext.Provider value={[newColumn, setNewColumn]}>
    <TaskContext.Provider value={[task, setTask]}>
    <ActualStatusContext.Provider value={[actualStatus, setActualStatus]}>
    {<div data-testid="board" className="board" data-theme={
      theme ? "dark" : "light"
    }>
      <Navbar />
      <div className="kanbanApp" onClick={() => {setOptions(false)}}>
      <BoardNavbar boardIndex={boardIndex}/>
      {boards.length === 0 ? <div className="empty">
        <h3>Create a new board to get started.</h3>
        <div className="addNewBoard" onClick={() => {
          setAddBoard(true)
        }}>
          <p>+ Add New Board</p>
        </div>
      </div> : <div className={`columns ${newColumn && "justifyContent"}`}>
        {boards.map((board:Board) => (
          board.nameOfTheBoard === whichBoard ? board?.columns?.map((column:ColumnType, index:number) => (
            <div key={index} className="column">
              <div className="columnName">
              <div className="oval" style={{ backgroundColor: getRandomColor() }}></div>
              <h5>{column.name} {`( ${column.tasks?.length === undefined ? "0" : column.tasks.length} )`}</h5>
              </div>
              {column?.tasks?.map((Task:TaskType, index:number) => (
                <div className={`task`} key={index} onClick={() => {
                  setTaskDisplay(Task)
                  setTaskIndex(index)
                  setActualStatus(column.name)
                  setTask(true)
                }}>
                  <h3>{Task.title}</h3>
                  <p>{`${Task.doneNumber === undefined ? "0" : Task.doneNumber} of ${Task.subtasks?.length}`} substasks</p>
                </div>
              ))}
            </div>
          )) : null
        ))}
        {
          whichBoard !== "" ? <div className={`newColumn ${newColumn && "newColumnNone"}`} onClick={() => {
            options === false && setAddColumn(true)
          }}>
              <h2>+ New Column</h2>
          </div>  : <div className="clickBoard">
            <h1>You{`'`}ve just created your first board, click on it by the sidebar at the left ;{`)`}</h1>
          </div>
        }
      </div>}
      </div>
      {task && <Task taskDisplay={taskDisplay} boardIndex={boardIndex} taskIndex={taskIndex} />}
      {addBoard && <AddBoard />}
      {addColumn && <AddColumn handleNewColumn={handleNewColumn} boardIndex={boardIndex}/>}
      {addTask && <AddNewTask boardIndex={boardIndex}/>}
      {editBoard && <EditBoard handleNewColumn={handleNewColumn} boardIndex={boardIndex} />}
      {editTask && <EditTask boardIndex={boardIndex} editedTask={editedTask} taskIndex={taskIndex}/>}
      {deleteBoard && <DeleteBoard boardIndex={boardIndex}/>}
      {deleteTask && <DeleteTask taskIndex={taskIndex} boardIndex={boardIndex} />}
      </div>}
    </ActualStatusContext.Provider>
    </TaskContext.Provider>
    </NewColumnContext.Provider>
    </DeleteTaskContext.Provider>
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
