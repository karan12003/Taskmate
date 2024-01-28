import React from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

function App() {

  return (
    <>
      <Outlet />
    </>
  )
}

export default App
