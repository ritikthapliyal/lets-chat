import React from 'react'
import { useAuth } from '../Contexts/AuthContext'

function Header() {

    const {authState,logout} = useAuth()
    
    const handleLogout = () => { logout() } 

    return (
        <div className='header horizontal-center'>
            <p>Lets Chat</p>
            <div className='header-inner-div horizontal-center'>
                <p>{authState.user.email}</p>
                <button className='site-button-1' onClick={handleLogout}>Log Out</button>
            </div>
        </div>
    )
}

export default Header