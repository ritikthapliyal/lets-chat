import React from 'react'
import { useAuth } from '../Contexts/AuthContext'
import Notification from './Notification'
import { useNotification } from '../Contexts/NotificationContext'

function Header() {

    const {authState,logout} = useAuth()
    const { setInitialNotification } = useNotification()
    
    const handleLogout = () => { 
        logout() 
        setInitialNotification([])
    } 

    return (
        <div className='header horizontal-center'>
            <p>Lets Chat</p>
            <div className='header-inner-div horizontal-center'>
                <p>{authState.user.email}</p>
                <Notification/>
                <button className='site-button-1' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Header