"use client"
import { WhichBoardContext } from '@/context/WhichBoardContext'
import React, { useContext, Dispatch, SetStateAction } from 'react'
import Logo from '../logo/logo'
import { NavbarContext } from '@/context/NavbarContext'

function BoardNavbar() {
    const [welkeBoard, setWelkeBoard] = useContext(WhichBoardContext)
    const [navbarOff, setNavbarOff] = useContext(NavbarContext)
  return (
    <div className='boardNavbar' data-testid="boardNavbar">
        <div className="boardNavbarLeft">
        {navbarOff && <Logo />}
        <h1>{welkeBoard}</h1>
        </div>
        <div className="navigation">
            <div className="addNewTask">
                <p>+ Add New Task</p>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="5" height="20" viewBox="0 0 5 20" fill="none">
            <circle cx="2.30769" cy="2.30769" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="10" r="2.30769" fill="#828FA3"/>
            <circle cx="2.30769" cy="17.6923" r="2.30769" fill="#828FA3"/>
            </svg>
        </div>
    </div>
  )
}

export default BoardNavbar