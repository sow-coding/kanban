import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'
import ActualStatusContextProvider from '@/context/ActualStatusContext'
import AddBoardContextProvider from '@/context/AddBoardContext'
import AddColumnContextProvider from '@/context/AddColumnContext'
import AddTaskContextProvider from '@/context/AddTaskContext'
import BoardsContextProvider from '@/context/BoardsContext'
import DeleteBoardContextProvider from '@/context/DeleteBoardContext'
import DeleteTaskContextProvider from '@/context/DeleteTaskContext'
import EditBoardContextProvider from '@/context/EditBoardContext'
import NavbarContextProvider from '@/context/NavbarContext'
import EditTaskContextProvider from '@/context/EditTaskContext'
import NewColumnContextProvider from '@/context/NewColumnContext'
import OptionsContextProvider from '@/context/OptionsContext'
import TaskContextProvider from '@/context/TaskContext'
import ThemeContextProvider from '@/context/ThemeContext'
import WhichBoardContextProvider from '@/context/WhichBoardContext'
import PhoneNavbarContextProvider from '@/context/PhoneNavbarContext'

const kanbanFont = Plus_Jakarta_Sans ({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kanban',
  description: 'A SaaS to manage your business and your time'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ActualStatusContextProvider>
    <AddBoardContextProvider>
    <AddColumnContextProvider>
    <BoardsContextProvider>
    <DeleteBoardContextProvider>
    <DeleteTaskContextProvider>
    <EditBoardContextProvider>
    <NavbarContextProvider>
    <EditTaskContextProvider>
    <NewColumnContextProvider>
    <OptionsContextProvider>
    <TaskContextProvider>
    <ThemeContextProvider>
    <WhichBoardContextProvider>
    <PhoneNavbarContextProvider>
    <AddTaskContextProvider>
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      </head>
      <body className={kanbanFont.className}>{children}</body>
    </html>
    </AddTaskContextProvider>
    </PhoneNavbarContextProvider>
    </WhichBoardContextProvider>
    </ThemeContextProvider>
    </TaskContextProvider>
    </OptionsContextProvider>
    </NewColumnContextProvider>
    </EditTaskContextProvider>
    </NavbarContextProvider>
    </EditBoardContextProvider>
    </DeleteTaskContextProvider>
    </DeleteBoardContextProvider>
    </BoardsContextProvider>
    </AddColumnContextProvider>
    </AddBoardContextProvider>
    </ActualStatusContextProvider>
  )
}
