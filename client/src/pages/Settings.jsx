import React from 'react'
import Header from '../components/Header'
import { useSelector } from 'react-redux'
import Logout from '../components/Logout'

function Settings() {


    const login = useSelector(state => state.auth.login)
    const signup = useSelector(state => state.auth.signup)


    return (<>
        <Logout />
            <Header />
    </>
    )
}

export default Settings
