"use client"
import { ColumnType } from '@/app/page';
import { useAddColumnContext } from '@/contexts/AddColumnContext'
import { useBoardsContext } from '@/contexts/BoardsContext';
import { useNewColumnContext } from '@/contexts/NewColumnContext';
import React, {useState} from 'react'
interface addColumnProps {
    boardIndex: number;
    handleNewColumn: (boardIndex: number, newColumns: ColumnType[]) => void;
}

function AddColumn(props: addColumnProps) {
    const {setAddColumn} = useAddColumnContext()
    const [columns, setColumns] = useState<string[]>(["first column"])
    const [columnsBoard, setColumnsBoard] = useState<ColumnType[]>([])
    const {boards} = useBoardsContext()
    const deleteColumn = (index: number) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };
    const {setNewColumn} = useNewColumnContext()
    return (
    <div className='calc' onClick={() => {
        setAddColumn(false)
    }}>
        <div className="addColumn" onClick={(e) => {
            e.stopPropagation()
        }}>
            <h1>Add New Column</h1>
            <div className="columnsBoard">
            <label htmlFor="columsBoard">Columns</label>
            {columns.map((column, index) => (
                <div className="columnBoard" key={index}>
                <input type="text" onBlur={(e) => {
                    e.currentTarget.value !== "" && setColumnsBoard([...columnsBoard, {
                        name: e.currentTarget.value,
                        tasks: []
                    }])
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
                setColumns([...columns, "new column"])
            }}>
                <p>+ Add New Column</p>
            </div>
            <div className="createNewColumn" onClick={() => {
                props.handleNewColumn(props.boardIndex, columnsBoard);
                if (boards[props.boardIndex].columns.length === 4) {
                    setNewColumn(true)
                } else {
                    setNewColumn(false)
                } 
                setAddColumn(false)
            }}>
                <p>Create New Column</p>
            </div>
        </div>
        </div>
    </div>
  )
}

export default AddColumn