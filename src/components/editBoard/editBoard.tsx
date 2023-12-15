"use client"
import { AddBoardContext } from '@/context/AddBoardContext'
import { BoardsContext } from '@/context/BoardsContext'
import { EditBoardContext } from '@/context/EditBoardContext';
import { WhichBoardContext } from '@/context/WhichBoardContext';
import React, { useState, useContext } from 'react'

interface ColumnType {
    name: string;
    tasks?: Task[];
  }
  interface Task {
    title: string;
    description: string;
    substaks: string[]
  }

  interface editBoardPros {
    boardIndex: number
  }

  interface ColumnType {
    name: string;
    tasks?: Task[]
  }

function EditBoard(props: editBoardPros) {
    //Regler le bug de quand je cree/edit board, je suis pas direct dessus !
    const [columns, setColumns] = useState<string[]>(["first column"])
    const [columnsBoard, setColumnsBoard] = useState<ColumnType[]>([])
    const [boards, setBoards] = useContext(BoardsContext)
    const [whichBoard, setWhichBoard] = useContext(WhichBoardContext)
    const [nameBoard, setNameBoard] = useState<string>(whichBoard)
    const [editBoard, setEditBoard] = useContext(EditBoardContext)
    const boardIndex = props.boardIndex
    const editColumn: ColumnType[] = boards[boardIndex]?.columns

    const deleteColumn = (index: number) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };

    const saveChanges = () => {
        const updatedBoards = [...boards];
        updatedBoards[boardIndex] = {
          ...updatedBoards[boardIndex],
          nameOfTheBoard: nameBoard,
          columns: columnsBoard,
        };
        setBoards(updatedBoards);
        setEditBoard(false);
      };

  return (
    <div className='calc' onClick={() => {
        setEditBoard(false)
    }}>
        <div className="editBoard" onClick={(e) => {
            e.stopPropagation()
        }}>
            <h1>Edit Board</h1>
            <div className="editBoardName">
                <label htmlFor="boardName">Name</label>
                <input type="text" defaultValue={whichBoard} onBlur={(e) => {
                    setNameBoard(e.currentTarget.value)
                }}/>
            </div>

            <div className="columnsBoard">
            <label htmlFor="columsBoard">Columns</label>
            {editColumn?.map((column, index) => (
                <div className="columnBoard" key={index}>
                <input type="text" defaultValue={column.name} onBlur={(e) => {
                    e.currentTarget.value !== "" && setColumnsBoard([...columnsBoard, {
                        name: e.currentTarget.value,
                        tasks: []
                    }])
                }}/>
                <svg id={`${index}`} onClick={(e) => {
                    deleteColumn(index)
                }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                </svg>
            </div>
            ))}
            <div className="addNewColumn" onClick={() => {
                setColumns([...columns, "new column"])
            }}>
                <p>+ Add New Column</p>
            </div>
            <div className="saveChanges" onClick={() => {
               saveChanges()
            }}>
                <p>Create New Board</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditBoard