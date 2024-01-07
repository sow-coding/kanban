"use client"
import { BoardsContext } from '@/context/BoardsContext'
import { EditBoardContext } from '@/context/EditBoardContext';
import { WhichBoardContext } from '@/context/WhichBoardContext';
import React, { useState, useContext } from 'react'
import { setTimeout } from 'timers/promises';

interface Subtask {
    name?: string;
  }
interface ColumnType {
    name: string;
    tasks?: Task[]
  }
  interface Task {
    title: string;
    description: string;
    substaks: Subtask[]
  }
  interface editBoardPros {
    handleNewColumn: (boardIndex: number, newColumns: ColumnType[]) => void;
    boardIndex: number;
  }

function EditBoard(props: editBoardPros) {
    const [boards, setBoards] = useContext(BoardsContext)
    const boardIndex = props.boardIndex
    const editColumn: ColumnType[] = boards[boardIndex]?.columns
    const [whichBoard, setWhichBoard] = useContext(WhichBoardContext)
    const [nameBoard, setNameBoard] = useState<string>(whichBoard)
    const [editBoard, setEditBoard] = useContext(EditBoardContext)
    const [columnsBoard, setColumnsBoard] = useState<ColumnType[]>(editColumn || [])
    const [columns, setColumns] = useState<ColumnType[]>(columnsBoard)

    const deleteColumn = (index: number) => {
        const newColumns = [...columnsBoard];
        newColumns.splice(index, 1);
        setColumnsBoard(newColumns);
        setColumns(newColumns)
    };

    function removeEmptyColumns() {
        const filteredColumns = columnsBoard.filter(column => column.name !== "");
      
        setColumnsBoard(filteredColumns)
    }  

    const filteredColumnsBoard = columnsBoard.filter((column, index) => {
        return JSON.stringify(editColumn[index]) !== JSON.stringify(column);
    });

    function getUpdatedColumns(editColumn: ColumnType[], columnsBoard: ColumnType[]): ColumnType[] {
        const isSame = JSON.stringify(editColumn) === JSON.stringify(columnsBoard);
    
        if (isSame) {
            return editColumn;
        } else if (editColumn.length === columnsBoard.length) {
            return filteredColumnsBoard;
        } else {
            return columnsBoard;
        }
    }
//Regle le probleme de la column a metttre dans saveChanges, 
//il doit avoir fonction dans input qui change sa valeur a lui dans columnBoards, qui lui sera poste!
//chaque input rechange sa valeur a lui du coup que columnsBoard pris en compte et changement sur lui !
    const saveChanges = () => {
        const updatedBoards = [...boards];
        //const updatedColumns = getUpdatedColumns(editColumn, columnsBoard);
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
            {columns?.map((column, index) => (
                <div className="columnBoard" key={index}>
                <input type="text" defaultValue={column.name} onBlur={(e) => {
                    (e.currentTarget.value !== "" && e.currentTarget.value !== column.name) && setColumnsBoard([...columnsBoard, {
                        name: e.currentTarget.value,
                        tasks: []
                    }]);
                }}/>
                <svg id={`${index}`} onClick={() => {
                    deleteColumn(index)
                }} xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                <rect x="12.7275" width="3" height="18" transform="rotate(45 12.7275 0)" fill="#828FA3"/>
                <rect y="2.12132" width="3" height="18" transform="rotate(-45 0 2.12132)" fill="#828FA3"/>
                </svg>
            </div>
            ))}
            <div className="addNewColumn" onClick={() => {
                setColumns([...columns, {
                    name: ""
                }])
            }}>
                <p>+ Add New Column</p>
            </div>
            <div className="saveChanges" onClick={() => {
                removeEmptyColumns()
                saveChanges()
                setWhichBoard(nameBoard)
            }}>
                <p>Save Changes</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditBoard