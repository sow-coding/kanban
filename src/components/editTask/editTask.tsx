"use client"
import { BoardsContext } from '@/context/BoardsContext';
import { EditTaskContext } from '@/context/EditTaskContext'
import { WhichBoardContext } from '@/context/WhichBoardContext';
import React, { useContext, useState } from 'react'

interface editTaskProps {
    boardIndex: number;
    editedTask: Task;
    taskIndex: number;
}

interface Task {
    title: string;
    description: string;
    substasks?: Subtask[]
  }
  interface Board {
    nameOfTheBoard: string;
    columns: ColumnType[]
  }
  interface ColumnType {
    name: string;
    tasks: Task[]
  }
  interface Subtask {
    name?: string;
  }
  

function EditTask(props: editTaskProps) {
    const [editTask, setEditTask] = useContext(EditTaskContext)
    const [subtasks, setSubtasks] = useState<Subtask[]>(props.editedTask.substasks ?? [])
    const [boards, setBoards] = useContext(BoardsContext)
    const [welkeBoard, setWelkeBoard] = useContext(WhichBoardContext)
    const selectedBoard: Board = boards?.find((board: Board) => board.nameOfTheBoard === welkeBoard);
    const [statusOpen, setStatusOpen] = useState<boolean>(false)
    const [actualStatus, setActualStatus] = useState<string>(selectedBoard?.columns[0]?.name)
    const [titleTask, setTitleTask] = useState<string>(props.editedTask.title)
    const [descriptionTask, setDescriptionTask] = useState<string>(props.editedTask.description)
    const [subtasksArray, setSubtasksArray] = useState<Subtask[]>([])
    const newTask: Task = {
      title: titleTask,
      description: descriptionTask,
      substasks: subtasksArray
    }
    const deleteSubtask = (index: number) => {
      const newSubtask = [...subtasks];
      newSubtask.splice(index, 1);
      setSubtasks(newSubtask);
    };

    const saveChanges = (boardIndex: number, editedTask: Task) => {
      const updatedBoards: Board[] = [...boards];
      
      const columnIndex :number = updatedBoards[boardIndex]?.columns.findIndex(
        (column) => column.name === actualStatus
      )

      updatedBoards[boardIndex].columns[columnIndex].tasks[props.taskIndex] = {
        ...updatedBoards[boardIndex].columns[columnIndex].tasks[props.taskIndex],
        title: editedTask.title,
        description: editedTask.description,
        substasks: editedTask.substasks
      }
      
      setBoards(updatedBoards);
    }
    return (
    <div className="calc" onClick={() => {
        setEditTask(false)
      }}>
        <div className='addTask' onClick={(e) => {
          e.stopPropagation()
        }}>
        <h1>Edit Task</h1>
        <div className="title">
          <label htmlFor="title">Title</label>
          <input type="text" defaultValue={props.editedTask.title} placeholder='e.g. Take coffee break' onBlur={(e) => {
            setTitleTask(e.currentTarget.value)
          }}/>
        </div>
  
        <div className="description">
          <label htmlFor="description">Description</label>
          <input type="text" defaultValue={props.editedTask.description} placeholder='e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.' onBlur={(e) => {
            setDescriptionTask(e.currentTarget.value)
          }}/>
        </div>
  
        <div className="subtasks">
          <label htmlFor="subtasks">Substaks</label>
          {subtasks.map((subtask, index) => (
                  <div className="subtaskBoard" key={index}>
                  <input type="text" defaultValue={subtask?.name} placeholder='e.g. Drink coffee & smile' onBlur={(e) => {
                      setSubtasksArray([...subtasksArray, {
                        name: e.currentTarget.value
                      }])
                  }}/>
                  <svg id={`${index}`} onClick={(e) => {
                      deleteSubtask(index)
                  }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                  <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                  </svg>
              </div>
            ))}       
          <div className="addNewSubtask" onClick={() => {
                  setSubtasks([...subtasks, {}])
              }}>
                  <p>+ Add New Subtask</p>
              </div>
        </div>
  
        <div className="status">
          <label htmlFor="status">Status</label>
          <div className="statusAccordion">
              {statusOpen ? <div className='statusList'>
                {selectedBoard.columns?.map((column: ColumnType, index:number) => (
                  <div key={index} className='state' onClick={() => {
                    setActualStatus(column.name)
                    setStatusOpen(false)
                  }}>
                    <p>{column.name}</p>
                  </div>
                ))}
              </div> : <div className='statusMenu' onClick={() => {
                setStatusOpen(true)
              }}>
              <p>{actualStatus}</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="8" viewBox="0 0 11 8" fill="none">
                <path d="M0.79834 1.54863L5.49682 6.24711L10.1953 1.54863" stroke="#635FC7" strokeWidth="2"/>
              </svg>
            </div>}
          </div>
        </div>
  
        <div className="saveChanges" onClick={() => {
          saveChanges(props.boardIndex, newTask)
          setEditTask(false)
        }}>
          <p>Save Changes</p>
        </div>
        </div>
      </div>
  )
}

export default EditTask