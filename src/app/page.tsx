"use client"
import Navbar from "@/components/navbar/navbar";
import { useBoardsContext } from "@/context/BoardsContext";
import React, { useState } from "react";
import AddBoard from '@/components/addBoard/addBoard'
import { useAddBoardContext } from "@/context/AddBoardContext";
import { useWhichBoardContext } from "@/context/WhichBoardContext";
import BoardNavbar from "@/components/boardNavbar/boardNavbar";
import AddColumn from "@/components/addColumn/addColumn";
import { useAddColumnContext } from "@/context/AddColumnContext";
import AddNewTask from "@/components/addNewTask/addNewTask";
import { useAddTaskContext } from "@/context/AddTaskContext";
import EditBoard from "@/components/editBoard/editBoard";
import { useEditBoardContext } from "@/context/EditBoardContext";
import EditTask from "@/components/editTask/editTask";
import { useEditTaskContext } from "@/context/EditTaskContext";
import DeleteBoard from "@/components/deleteBoard/deleteBoard";
import { useDeleteBoardContext } from "@/context/DeleteBoardContext";
import { useOptionsContext } from "@/context/OptionsContext";
import DeleteTask from "@/components/deleteTask/deleteTask";
import { useDeleteTaskContext } from "@/context/DeleteTaskContext";
import { useNewColumnContext } from "@/context/NewColumnContext";
import { useTaskContext } from "@/context/TaskContext";
import Task from "@/components/task/task";
import { useActualStatusContext } from "@/context/ActualStatusContext";
import { useThemeContext } from "@/context/ThemeContext";
import { usePhoneNavbarContext } from "@/context/PhoneNavbarContext";

export interface UseContextHook {
  children: React.ReactNode
}
export interface Subtask {
  name: string;
  done: boolean
}
export interface TaskType {
  title: string;
  description: string;
  subtasks?: Subtask[];
  doneNumber?: number;
}
export interface ColumnType {
  name: string;
  tasks: TaskType[]
}
export interface Board {
  nameOfTheBoard: string;
  columns: ColumnType[]
}

export default function Board() {
  //enlever bug column color avec getRandomColor
  const handleNewColumn = (boardIndex:number, newColumns: ColumnType[]) => {
    const updatedBoards: Board[] = [...boards];
    updatedBoards[boardIndex]?.columns?.push(...newColumns);
    setBoards(updatedBoards);
  };
  const {addBoard, setAddBoard} = useAddBoardContext()
  const {setActualStatus} = useActualStatusContext()
  const {addColumn, setAddColumn} = useAddColumnContext()
  const {addTask} = useAddTaskContext()
  const {deleteBoard} = useDeleteBoardContext()
  const {boards, setBoards} = useBoardsContext()
  const {deleteTask} = useDeleteTaskContext()
  const {editBoard} = useEditBoardContext()
  const {editTask} = useEditTaskContext()
  const {options, setOptions} = useOptionsContext()
  const {newColumn} = useNewColumnContext()
  const {phoneNavbarOff, setPhoneNavbarOff} = usePhoneNavbarContext()
  const {task, setTask} = useTaskContext()
  const {theme} = useThemeContext()
  const {whichBoard} = useWhichBoardContext()
  const [editedTask, setEditedTask] = useState<TaskType>({
    title: "",
    description: "",
    subtasks: []
  })
  const boardIndex = boards.findIndex(board => board.nameOfTheBoard === whichBoard);
  const [taskIndex, setTaskIndex] = useState<number>(0)
  const [taskDisplay, setTaskDisplay] = useState({
    title: "",
    description: "",
  })

  const getRandomColor = () => {
    const colors = ["#49C4E5", "#8471F2", "#67E2AE", "#EA5555"];
    return colors[Math.floor(Math.random() * colors.length)];
  }

  return (
    <>
    <div data-testid="board" className={`board ${phoneNavbarOff && "phoneNavbarDisplayed"}`} data-theme={
      theme === "dark" ? "dark" : "light"
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
      <svg className='eye2' onClick={() => {
        setPhoneNavbarOff(!phoneNavbarOff)
      }} xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48" fill="none">
        <path d="M0 0H32C45.2548 0 56 10.7452 56 24C56 37.2548 45.2548 48 32 48H0V0Z" fill="#635FC7"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M33.8154 23.4342C32.2491 20.7764 29.328 19 26 19C22.6706 19 19.7501 20.7776 18.1846 23.4342C17.9385 23.8519 17.9385 24.3703 18.1846 24.788C19.7509 27.4458 22.6719 29.2222 26 29.2222C29.3294 29.2222 32.2499 27.4446 33.8154 24.788C34.0615 24.3703 34.0615 23.8519 33.8154 23.4342ZM26 27.8889C23.9122 27.8889 22.2222 26.1992 22.2222 24.1111C22.2222 22.0233 23.9118 20.3333 26 20.3333C28.0878 20.3333 29.7778 22.0229 29.7778 24.1111C29.7778 26.1989 28.0882 27.8889 26 27.8889ZM26 27C27.5955 27 28.8889 25.7066 28.8889 24.1111C28.8889 22.5156 27.5955 21.2222 26 21.2222C25.5081 21.2222 25.045 21.3453 24.6396 21.5621L24.6405 21.5621C25.2975 21.5621 25.8301 22.0947 25.8301 22.7516C25.8301 23.4086 25.2975 23.9412 24.6405 23.9412C23.9836 23.9412 23.451 23.4086 23.451 22.7516L23.451 22.7507C23.2342 23.1561 23.1111 23.6192 23.1111 24.1111C23.1111 25.7066 24.4045 27 26 27Z" fill="white"/>
      </svg>
    </div>
    <Navbar />
    </>
  )
}
