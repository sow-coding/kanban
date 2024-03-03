"use client"
import { useWhichBoardContext } from '@/contexts/WhichBoardContext'
import React from 'react'
import Logo from '../logo/logo'
import { useNavbarContext } from '@/contexts/NavbarContext'
import { useAddTaskContext } from '@/contexts/AddTaskContext'
import { useEditBoardContext } from '@/contexts/EditBoardContext'
import { useDeleteBoardContext } from '@/contexts/DeleteBoardContext'
import { useOptionsContext } from '@/contexts/OptionsContext'
import { useBoardsContext } from '@/contexts/BoardsContext'

interface BoardNavbarProps {
  boardIndex: number
}

function BoardNavbar(props: BoardNavbarProps) {
    const {whichBoard} = useWhichBoardContext()
    const {navbarOff} = useNavbarContext()
    const {setAddTask} = useAddTaskContext()
    const {setEditBoard} = useEditBoardContext()
    const {setDeleteBoard} = useDeleteBoardContext()
    const {options, setOptions} = useOptionsContext()
    const {boards} = useBoardsContext()

    return (
    <div className='boardNavbar' data-testid="boardNavbar" onClick={(e) => {e.stopPropagation()}}>
        <div className="boardNavbarLeft">
        {navbarOff && <Logo />}
        <h1>{whichBoard}</h1>
        </div>
        <div className="navigation">
            <div className={`addNewTask ${(boards.length === 0 || boards[0].columns.length === 0) && "addNewTaskDisable"}`} onClick={() => {
              whichBoard !== "" ? setAddTask(true) : alert("Create at least one column to do add a new task !")
            }}>
                <p>+<span className='newTaskSpan'> Add New Task</span></p>
            </div>
            <svg onClick={() => {boards.length !== 0 ? setOptions(true) : alert("Create at least one column to do that !")}} xmlns="http://www.w3.org/2000/svg" width="5" height="20" viewBox="0 0 5 20" fill="none">
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3"/>
            </svg>
        </div>
        <div className={`options ${options === false && 'none'}`}>
              <div onClick={() => {
                setEditBoard(true)
                }}>
                <h5 className='editBoardText'>Edit Board</h5>
              </div>
              <div onClick={() => {setDeleteBoard(true)}}>
                <h5 className='deleteBoardText'>Delete Board</h5>
              </div>
          </div>
    </div>
  )
}

export default BoardNavbar