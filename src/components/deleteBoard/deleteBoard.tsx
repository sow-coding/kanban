import { DeleteBoardContext } from '@/context/DeleteBoardContext'
import React, { useContext } from 'react'

function DeleteBoard() {
    const [deleteBoard, setDeleteBoard] = useContext(DeleteBoardContext)
  return (
    <div className="calc" onClick={() => {
        setDeleteBoard(false)
    }}>
        <div className="deleteBoard" onClick={(e) => {
            e.stopPropagation()
        }}>
            <h1>Delete Board</h1>
        </div>
    </div>
  )
}

export default DeleteBoard