"use client"

import { AddBoardContext } from "@/context/AddBoardContext";
import { BoardsContext } from "@/context/BoardsContext";
import { useContext, useState } from "react"

interface Board {
    nameOfTheBoard: string
}

function AddBoard() {
    const [columns, setColumns] = useState<string[]>(["first column"])
    const [addBoard, setAddBoard] = useContext(AddBoardContext)
    const [boards, setBoards] = useContext(BoardsContext)
    const [board, setBoard] = useState<Board>({
        nameOfTheBoard: ""
    })

    const deleteColumn = (index: number) => {
        const newColumns = [...columns];
        newColumns.splice(index, 1);
        setColumns(newColumns);
    };

  return (
    <div className="calc">
    <div className='addBoard' data-testid="addBoard">
        <h1>Add New Board</h1>
        <div className="boardName">
            <label htmlFor="boardName">Name</label>
            <input type="text" placeholder='e.g. Web Design' onChange={(e) => {
                setBoard({
                    nameOfTheBoard: e.currentTarget.value
                })
            }}/>
        </div>
        <div className="columnsBoard">
            <label htmlFor="columsBoard">Columns</label>
            {columns.map((column, index) => (
                <div className="columnBoard" key={index}>
                <input type="text" />
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
                setBoards([...boards, board])
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