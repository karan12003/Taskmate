import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Logout from './components/Logout.jsx'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
import TaskList from './pages/Tasklist.jsx'
import Settings from './pages/Settings.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} >
      <Route path="/" element={<Home />} />
      <Route path="/tasklist" element={<TaskList />} />
      <Route path="/tasklist/:category" element={<TaskList />} />
      <Route path="/logout" element={<Logout />} />
      <Route path="/settings" element={<Settings />} />
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
