"use client"
import { ColumnType } from "@/app/page";
import { useAddBoardContext } from "@/context/AddBoardContext";
import { useBoardsContext } from "@/context/BoardsContext";
import { useWhichBoardContext } from "@/context/WhichBoardContext";
import { useState } from "react"

function AddBoard() {
    const [columns, setColumns] = useState<string[]>(["first column"])
    const {setAddBoard} = useAddBoardContext()
    const {boards, setBoards} = useBoardsContext()
    const [nameBoard, setNameBoard] = useState<string>("")
    const [columnsBoard, setColumnsBoard] = useState<ColumnType[]>([])
    const {setWhichBoard} = useWhichBoardContext()

    const deleteColumn = (index: number) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };

  return (
    <div className="calc" onClick={() => {
        setAddBoard(false)
    }}>
    <div className='addBoard' data-testid="addBoard" onClick={(e) => {
        e.stopPropagation()
    }}>
        <h1>Add New Board</h1>
        <div className="boardName">
            <label htmlFor="boardName">Name</label>
            <input type="text" placeholder='e.g. Web Design' onChange={(e) => {
                setNameBoard(e.currentTarget.value)
            }}/>
        </div>
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
            <div className="createNewBoard" onClick={() => {
                setBoards([...boards, {
                    nameOfTheBoard: `${nameBoard}`,
                    columns: columnsBoard
                }])
                boards?.length === 0 && setWhichBoard(nameBoard)
                setAddBoard(false)
            }}>
                <p>Create New Board</p>
            </div>
        </div>
    </div>
    </div>
  )
}

export default AddBoard