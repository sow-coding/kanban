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
  //rajouter logo version tel + menu calc + barrer task when done + reduire taille btn addNewTask
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
    <div data-testid="board" className="board" data-theme={
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
      </div>
  )
}
