import { useBoardsContext } from '@/contexts/BoardsContext'
import { useDeleteBoardContext } from '@/contexts/DeleteBoardContext'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useWhichBoardContext } from '@/contexts/WhichBoardContext'
import React from 'react'

interface deleteBoardProp {
    boardIndex: number
}

function DeleteBoard(props: deleteBoardProp) {
    const {setDeleteBoard} = useDeleteBoardContext()
    const {whichBoard, setWhichBoard} = useWhichBoardContext()
    const {setOptions} = useOptionsContext()
    const {boards, setBoards} = useBoardsContext()
    
    const nextBoard = () => {
        if (props.boardIndex > 0) {
            return boards[props.boardIndex - 1]?.nameOfTheBoard
        } else {
            setBoards([])
            return ""
        }
    }

    return (
    <div className="calc" onClick={() => {
        setDeleteBoard(false)
        setOptions(false)
    }}> 
        <div className="deleteBoard" onClick={(e) => {
            e.stopPropagation()
        }}>
            <h1>Delete this board ?</h1>
            <p>Are you sure you want to delete the {whichBoard} board ? This action will remove all columns and tasks and cannot be reversed.</p>
            <div className="deleteBoardButtons">
                <div className="delete" onClick={() => {
                    const newBoards = [...boards]
                    newBoards.splice(props.boardIndex, 1)
                    setBoards(newBoards)
                    setWhichBoard(nextBoard)
                    setDeleteBoard(false)
                    setOptions(false)
                }}>
                    <p>Delete</p>
                </div>
                <div className="cancel" onClick={() => {
                    setDeleteBoard(false)
                    setOptions(false)
                    }}>
                    <p>Cancel</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DeleteBoard