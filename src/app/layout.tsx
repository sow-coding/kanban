import type { Metadata } from 'next'
import { Plus_Jakarta_Sans } from 'next/font/google'
import '../styles/global.css'
import ActualStatusContextProvider from '@/contexts/ActualStatusContext'
import AddBoardContextProvider from '@/contexts/AddBoardContext'
import AddColumnContextProvider from '@/contexts/AddColumnContext'
import AddTaskContextProvider from '@/contexts/AddTaskContext'
import BoardsContextProvider from '@/contexts/BoardsContext'
import DeleteBoardContextProvider from '@/contexts/DeleteBoardContext'
import DeleteTaskContextProvider from '@/contexts/DeleteTaskContext'
import EditBoardContextProvider from '@/contexts/EditBoardContext'
import NavbarContextProvider from '@/contexts/NavbarContext'
import EditTaskContextProvider from '@/contexts/EditTaskContext'
import NewColumnContextProvider from '@/contexts/NewColumnContext'
import OptionsContextProvider from '@/contexts/OptionsContext'
import TaskContextProvider from '@/contexts/TaskContext'
import ThemeContextProvider from '@/contexts/ThemeContext'
import WhichBoardContextProvider from '@/contexts/WhichBoardContext'
import PhoneNavbarContextProvider from '@/contexts/PhoneNavbarContext'

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
