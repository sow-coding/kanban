"use client"
import { DeleteTaskContext } from '@/context/DeleteTaskContext'
import React, {useContext} from 'react'

function DeleteTask() {
    const [deleteTask, setDeleteTask] = useContext(DeleteTaskContext)
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