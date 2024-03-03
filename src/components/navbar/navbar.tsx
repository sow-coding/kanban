"use client"
import React from 'react'
import Logo from '../logo/logo'
import Switch from '@mui/material/Switch';
import BoardStick from '../boardStick/boardStick';
import { useBoardsContext } from '@/contexts/BoardsContext';
import { useAddBoardContext } from '@/contexts/AddBoardContext';
import { useNavbarContext } from '@/contexts/NavbarContext';
import { useThemeContext } from '@/contexts/ThemeContext';
import { usePhoneNavbarContext } from '@/contexts/PhoneNavbarContext';

function Navbar() {
  const {theme, setTheme} = useThemeContext()
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  const {navbarOff, setNavbarOff} = useNavbarContext()
  const {boards} = useBoardsContext()
  const {setAddBoard} = useAddBoardContext()
  const {phoneNavbarOff, setPhoneNavbarOff} = usePhoneNavbarContext()
  return (
    <div className={`navbar ${navbarOff && "noPadding noWidth20"}`} data-theme={theme} data-phonenavbar={`${phoneNavbarOff && "true"}`} data-testid="navbar">
        {
          navbarOff ? 
          <svg className='eye' onClick={() => {
            setNavbarOff(false)
          }} xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48" fill="none">
            <path d="M0 0H32C45.2548 0 56 10.7452 56 24C56 37.2548 45.2548 48 32 48H0V0Z" fill="#635FC7"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M33.8154 23.4342C32.2491 20.7764 29.328 19 26 19C22.6706 19 19.7501 20.7776 18.1846 23.4342C17.9385 23.8519 17.9385 24.3703 18.1846 24.788C19.7509 27.4458 22.6719 29.2222 26 29.2222C29.3294 29.2222 32.2499 27.4446 33.8154 24.788C34.0615 24.3703 34.0615 23.8519 33.8154 23.4342ZM26 27.8889C23.9122 27.8889 22.2222 26.1992 22.2222 24.1111C22.2222 22.0233 23.9118 20.3333 26 20.3333C28.0878 20.3333 29.7778 22.0229 29.7778 24.1111C29.7778 26.1989 28.0882 27.8889 26 27.8889ZM26 27C27.5955 27 28.8889 25.7066 28.8889 24.1111C28.8889 22.5156 27.5955 21.2222 26 21.2222C25.5081 21.2222 25.045 21.3453 24.6396 21.5621L24.6405 21.5621C25.2975 21.5621 25.8301 22.0947 25.8301 22.7516C25.8301 23.4086 25.2975 23.9412 24.6405 23.9412C23.9836 23.9412 23.451 23.4086 23.451 22.7516L23.451 22.7507C23.2342 23.1561 23.1111 23.6192 23.1111 24.1111C23.1111 25.7066 24.4045 27 26 27Z" fill="white"/>
          </svg> :
          <>
        <div className="navbarMenu">
          <Logo />
            <div className="navbarMenuBoard">
            <p className='allBoard'>ALL BOARDS ({boards?.length})</p>
            {boards?.map((board, index:number) => (
              <BoardStick key={index} boardName={boards[index].nameOfTheBoard}/>
            ))}
            </div>
            <div data-testid="navbarMenuBoardAdd" className="navbarMenuAddBoard" onClick={() => {
              setPhoneNavbarOff(false)
              setAddBoard(true)
            }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z" fill="#635FC7"/>
            </svg>
            <p>+ Create New Board</p>
            </div>
        </div>
        <div className="navbarBottom">
          <div className="appMode">
            <Switch data-testid="changeModeBtn" {...label} onClick={() => {
              theme === "dark" ? setTheme("light") : setTheme("dark")
            }} />
          </div>
          <div className="hideSidebar" onClick={() => {
            setNavbarOff(true)
          }}> 
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="16" viewBox="0 0 18 16" fill="none">
            <path fillRule="evenodd" clipRule="evenodd" d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z" fill="#828FA3"/>
          </svg>
          <p>Hide Sidebar</p>
          </div>
        </div>
        </>
        }
      <svg className='eye2' onClick={() => {
        setPhoneNavbarOff(!phoneNavbarOff)
      }} xmlns="http://www.w3.org/2000/svg" width="56" height="48" viewBox="0 0 56 48" fill="none">
        <path d="M0 0H32C45.2548 0 56 10.7452 56 24C56 37.2548 45.2548 48 32 48H0V0Z" fill="#635FC7"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M33.8154 23.4342C32.2491 20.7764 29.328 19 26 19C22.6706 19 19.7501 20.7776 18.1846 23.4342C17.9385 23.8519 17.9385 24.3703 18.1846 24.788C19.7509 27.4458 22.6719 29.2222 26 29.2222C29.3294 29.2222 32.2499 27.4446 33.8154 24.788C34.0615 24.3703 34.0615 23.8519 33.8154 23.4342ZM26 27.8889C23.9122 27.8889 22.2222 26.1992 22.2222 24.1111C22.2222 22.0233 23.9118 20.3333 26 20.3333C28.0878 20.3333 29.7778 22.0229 29.7778 24.1111C29.7778 26.1989 28.0882 27.8889 26 27.8889ZM26 27C27.5955 27 28.8889 25.7066 28.8889 24.1111C28.8889 22.5156 27.5955 21.2222 26 21.2222C25.5081 21.2222 25.045 21.3453 24.6396 21.5621L24.6405 21.5621C25.2975 21.5621 25.8301 22.0947 25.8301 22.7516C25.8301 23.4086 25.2975 23.9412 24.6405 23.9412C23.9836 23.9412 23.451 23.4086 23.451 22.7516L23.451 22.7507C23.2342 23.1561 23.1111 23.6192 23.1111 24.1111C23.1111 25.7066 24.4045 27 26 27Z" fill="white"/>
      </svg>
    </div>
  )
}

export default Navbar