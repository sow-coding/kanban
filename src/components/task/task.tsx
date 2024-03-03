"use client"
import { Subtask, TaskType } from '@/app/page';
import { useActualStatusContext } from '@/context/ActualStatusContext';
import { useBoardsContext } from '@/context/BoardsContext';
import { useDeleteTaskContext } from '@/context/DeleteTaskContext';
import { useEditTaskContext } from '@/context/EditTaskContext';
import { useTaskContext } from '@/context/TaskContext';
import React, { useState } from 'react'

interface TaskCompletedType {
  title: string;
  description: string;
  subtasks: Subtask[];
  doneNumber?: number;
}
interface taskProps {
  taskDisplay: TaskType;
  boardIndex: number;
  taskIndex: number;
}

function Task(props:taskProps) {
  const {setTask} = useTaskContext()
  const {boards, setBoards} = useBoardsContext()
  const [taskOptions, setTaskOptions] = useState(false)
  const {setEditTask} = useEditTaskContext()
  const {setDeleteTask} = useDeleteTaskContext()
  const [subtaskChecked, setSubtaskChecked] = useState<boolean[]>(Array(props.taskDisplay.subtasks?.length).fill(false));
  const [subtasksDoneNumber, setSubtasksDoneNumber] = useState<number>(0)
  const {actualStatus} = useActualStatusContext()
  
  const toggleSubtask = (index: number) => {
    const newSubtaskChecked = [...subtaskChecked];
    newSubtaskChecked[index] = !newSubtaskChecked[index];
    setSubtaskChecked(newSubtaskChecked);
    
    if (newSubtaskChecked[index]) {
      setSubtasksDoneNumber(subtasksDoneNumber + 1);
      const updatedBoards = [...boards];
      const columnIndex :number = updatedBoards[props.boardIndex]?.columns.findIndex(
        (column) => column.name === actualStatus
      )
      updatedBoards[props.boardIndex].columns[columnIndex].tasks[props.taskIndex] = {
        ...updatedBoards[props.boardIndex].columns[columnIndex].tasks[props.taskIndex], 
        doneNumber: subtasksDoneNumber + 1
      }
      setBoards(updatedBoards);
    } else {
      setSubtasksDoneNumber(subtasksDoneNumber - 1);
      const updatedBoards = [...boards];
      const columnIndex :number = updatedBoards[props.boardIndex]?.columns.findIndex(
        (column) => column.name === actualStatus
      )
      updatedBoards[props.boardIndex].columns[columnIndex].tasks[props.taskIndex] = {
        ...updatedBoards[props.boardIndex].columns[columnIndex].tasks[props.taskIndex], 
        doneNumber: subtasksDoneNumber - 1
      }
      setBoards(updatedBoards);
    }
  }
  
  return (
    <div className="calc" onClick={() => {
      setTask(false)
      setTaskOptions(false)
    }}>
     <div className='taskContainer' onClick={(e) => {
      e.stopPropagation()
      setTaskOptions(false)
    }}>
      <div className="taskTitle">
      <div className={`taskOptions ${taskOptions === false && 'none'}`}>
              <div onClick={() => {
                setEditTask(true)
                }}>
                <h5 className='editBoardText'>Edit Task</h5>
              </div>
              <div onClick={() => {setDeleteTask(true)}}>
                <h5 className='deleteBoardText'>Delete Task</h5>
              </div>
          </div>
        <h1>{props.taskDisplay.title}</h1>
        <svg xmlns="http://www.w3.org/2000/svg" onClick={(e) => {e.stopPropagation(),setTaskOptions(true)}} width="5" height="20" viewBox="0 0 5 20" fill="none">
          <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3"/>
          <circle cx="2.30769" cy="9.99995" r="2.30769" fill="#828FA3"/>
          <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3"/>
        </svg>
      </div>
      <p>{props.taskDisplay.description}</p>
      <div className="subtasks">
        <h6>Subtasks {`( ${props.taskDisplay.doneNumber === undefined ? subtasksDoneNumber : props.taskDisplay.doneNumber} of ${props.taskDisplay.subtasks?.length} )`}</h6>
        {props.taskDisplay.subtasks?.map((subtask, index) => (
          <div className={`subtask`} key={index} onClick={() => {
            toggleSubtask(index)
            }            
            }>
            {subtaskChecked[index] ? <></> : <input type="checkbox" name="subtask" checked={subtaskChecked[index]}/>}
            <p className={`${subtaskChecked[index] && "subtaskChecked"}`}>{subtask.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Task