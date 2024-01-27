"use client"
import { BoardsContext } from '@/context/BoardsContext'
import { DeleteTaskContext } from '@/context/DeleteTaskContext'
import { TaskContext } from '@/context/TaskContext';
import { WhichBoardContext } from '@/context/WhichBoardContext';
import React, {useContext, useState} from 'react'

interface deleteTaskProps {
    boardIndex: number;
    taskIndex: number;
}
interface Subtask {
    name?: string;
    done: boolean;
  }
  interface Task {
    title: string;
    description: string;
    subtasks?: Subtask[];
    doneNumber?: number;
  }
  interface ColumnType {
    name: string;
    tasks: Task[]
  }
  
  interface Board {
    nameOfTheBoard: string;
    columns: ColumnType[]
  }

function DeleteTask(props: deleteTaskProps) {
    const [deleteTask, setDeleteTask] = useContext(DeleteTaskContext)
    const [boards, setBoards] = useContext(BoardsContext)
    const [welkeBoard, setWelkeBoard] = useContext(WhichBoardContext)
    const selectedBoard: Board = boards?.find((board: Board) => board.nameOfTheBoard === welkeBoard);
    const [actualStatus, setActualStatus] = useState<string>(selectedBoard?.columns[0]?.name)
    const columnIndex :number = boards[props.boardIndex]?.columns.findIndex(
      (column: ColumnType) => column.name === actualStatus
    )
    const [task, setTask] = useContext(TaskContext)
  return (
    <div className="calc" onClick={() => {
        setDeleteTask(false)
    }}> 
        <div className="deleteTask" onClick={(e) => {
            e.stopPropagation()
        }}>
            <h1>Delete this task ?</h1>
            <p>Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.</p>
            <div className="deleteTaskButtons">
                <div className="delete" onClick={() => {
                    const newTasks = [...boards[props.boardIndex].columns[columnIndex].tasks]
                    newTasks.splice(props.taskIndex, 1)
                    boards[props.boardIndex].columns[columnIndex] = {
                        ...boards[props.boardIndex].columns[columnIndex],
                        tasks: newTasks
                    }
                    setTask(false)
                    setDeleteTask(false)
                }}>
                    <p>Delete</p>
                </div>
                <div className="cancel" onClick={() => {
                    setDeleteTask(false)
                    }}>
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteTask