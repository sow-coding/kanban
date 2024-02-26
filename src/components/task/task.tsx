"use client"
import { ActualStatusContext } from '@/context/ActualStatusContext';
import { BoardsContext } from '@/context/BoardsContext';
import { DeleteTaskContext } from '@/context/DeleteTaskContext';
import { EditTaskContext } from '@/context/EditTaskContext';
import { TaskContext } from '@/context/TaskContext';
import { WhichBoardContext } from '@/context/WhichBoardContext';
import React, { useContext, useState, useEffect } from 'react'

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

interface taskProps {
  taskDisplay: Task;
  boardIndex: number;
  taskIndex: number;
}

function Task(props:taskProps) {
  const [task, setTask] = useContext(TaskContext)
  const [boards, setBoards] = useContext(BoardsContext)
  const [taskOptions, setTaskOptions] = useState(false)
  const [editTask, setEditTask] = useContext(EditTaskContext)
  const [deleteTask, setDeleteTask] = useContext(DeleteTaskContext)
  const [subtaskChecked, setSubtaskChecked] = useState<boolean[]>(Array(props.taskDisplay.subtasks?.length).fill(false));
  const [subtasksDoneNumber, setSubtasksDoneNumber] = useState<number>(0)
  const [welkeBoard, setWelkeBoard] = useContext(WhichBoardContext)
  const [actualStatus, setActualStatus] = useContext(ActualStatusContext)

//regler prblms checkboxs qui apres a render du component Task ne sont plus checked alors que cheked 
//auparavant !
  
  const toggleSubtask = (index: number) => {
    const newSubtaskChecked = [...subtaskChecked];
    newSubtaskChecked[index] = !newSubtaskChecked[index];
    setSubtaskChecked(newSubtaskChecked);

    if (newSubtaskChecked[index]) {
      setSubtasksDoneNumber(subtasksDoneNumber + 1);
      const updatedBoards: Board[] = [...boards];
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
      const updatedBoards: Board[] = [...boards];
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
            <input type="checkbox" name="subtask" checked={subtaskChecked[index]}/>
            <p>{subtask.name}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Task