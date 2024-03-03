"use client"
import { ColumnType } from '@/app/page';
import { useBoardsContext } from '@/contexts/BoardsContext'
import { useDeleteTaskContext } from '@/contexts/DeleteTaskContext'
import { useTaskContext } from '@/contexts/TaskContext';
import { useWhichBoardContext } from '@/contexts/WhichBoardContext';
import React, { useState} from 'react'

interface deleteTaskProps {
    boardIndex: number;
    taskIndex: number;
} 

function DeleteTask(props: deleteTaskProps) {
    const {setDeleteTask} = useDeleteTaskContext()
    const {boards} = useBoardsContext()
    const {whichBoard} = useWhichBoardContext()
    const selectedBoard = boards?.find((board) => board.nameOfTheBoard === whichBoard);
    const [actualStatus, setActualStatus] = useState<string |undefined>(selectedBoard?.columns[0]?.name)
    const columnIndex :number = boards[props.boardIndex]?.columns.findIndex(
      (column: ColumnType) => column.name === actualStatus
    )
   const {setTask} = useTaskContext()
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