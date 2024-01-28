import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Logout from '../components/Logout'
import Sidebar from '../components/Sidebar'

function Settings() {

    return (<>
        <Sidebar />
        <Header />
        <Logout />
    </>
    )
}

export default Settings
