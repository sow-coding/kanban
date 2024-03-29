"use client"
import { ColumnType } from '@/app/page';
import { useBoardsContext } from '@/contexts/BoardsContext'
import { useEditBoardContext } from '@/contexts/EditBoardContext';
import { useWhichBoardContext } from '@/contexts/WhichBoardContext';
import React, { useState } from 'react'

  interface editBoardPros {
    handleNewColumn: (boardIndex: number, newColumns: ColumnType[]) => void;
    boardIndex: number;
  }

function EditBoard(props: editBoardPros) {
    const {boards, setBoards} = useBoardsContext()
    const boardIndex = props.boardIndex
    const editColumn: ColumnType[] = boards[boardIndex]?.columns
    const {whichBoard, setWhichBoard} = useWhichBoardContext()
    const [nameBoard, setNameBoard] = useState<string>(whichBoard)
    const {setEditBoard} = useEditBoardContext()
    const [columnsBoard, setColumnsBoard] = useState<ColumnType[]>(editColumn || [])
    const [columns, setColumns] = useState<ColumnType[]>(columnsBoard)
    const [lengthIncreased, setLengthIncreased] = useState(false);
    const deleteColumn = (index: number) => {
        const newColumns = [...columnsBoard];
        newColumns.splice(index, 1);
        setColumnsBoard(newColumns);
        setColumns(newColumns)
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
            {columns?.map((column, index) => (
                <div className="columnBoard" key={index}>
                <input type="text" defaultValue={column.name} onBlur={(e) => {
                    if (lengthIncreased === false) {
                    const newColumns = [...columnsBoard];
                    newColumns[index].name = e.currentTarget.value;
                    setColumnsBoard(newColumns);
                    } else if (lengthIncreased === true ) {
                        setColumnsBoard([...columnsBoard, {
                            name: e.currentTarget.value,
                            tasks: []
                        }])
                    }
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
                if (columns.length >= editColumn.length) {
                    setLengthIncreased(true);
                }
                setColumns([...columns, {
                    name: "",
                    tasks: []
                }])
            }}>
                <p>+ Add New Column</p>
            </div>
            <div className={`saveChanges ${boards[props.boardIndex].columns.length === 4 && "addColumnDisable"} `} onClick={() => {
                columns.length === 5 ?  alert('4 columns max :)'): saveChanges()
                columns.length === 5 ?  "" : setWhichBoard(nameBoard)
            }}>
                <p>Save Changes</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default EditBoard