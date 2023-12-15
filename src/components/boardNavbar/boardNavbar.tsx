"use client"
import { WhichBoardContext } from '@/context/WhichBoardContext'
import React, { useContext, Dispatch, SetStateAction } from 'react'
import Logo from '../logo/logo'
import { NavbarContext } from '@/context/NavbarContext'
import { AddTaskContext } from '@/context/addTaskContext'
import { EditBoardContext } from '@/context/EditBoardContext'


function BoardNavbar() {
    const [welkeBoard, setWelkeBoard] = useContext(WhichBoardContext)
    const [navbarOff, setNavbarOff] = useContext(NavbarContext)
    const [addTask, setAddTask] = useContext(AddTaskContext)
    const [editBoard, setEditBoard] = useContext(EditBoardContext)
  return (
    <div className='boardNavbar' data-testid="boardNavbar">
        <div className="boardNavbarLeft">
        {navbarOff && <Logo />}
        <h1>{welkeBoard}</h1>
        </div>
        <div className="navigation">
            <div className="addNewTask" onClick={() => {
              welkeBoard !== "" ? setAddTask(true) : alert('non')
            }}>
                <p>+<span className='newTaskSpan'> Add New Task</span></p>
            </div>
            <svg onClick={() => {setEditBoard(true)}} xmlns="http://www.w3.org/2000/svg" width="5" height="20" viewBox="0 0 5 20" fill="none">
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3"/>
            </svg>
        </div>
    </div>
  )
}

export default BoardNavbar