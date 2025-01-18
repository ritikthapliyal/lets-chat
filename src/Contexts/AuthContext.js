import React, { createContext, useState, useContext } from 'react';
import { clearToken } from '../utils';
import { connectWebSocket } from '../Apis/Socket';
import { useNotification } from './NotificationContext';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { addNotification } = useNotification()

    const [authState, setAuthState] = useState({
        isAuthenticated: false,
        user: null,
        isAuthChecked : false
    })

    const login = (user) => {
        connectWebSocket(addNotification)
        setAuthState({ isAuthenticated: true, user, isAuthChecked : true })
    }

    const setIsAuthChecked = (isAuthChecked) => {
        setAuthState((prev) => ({...prev,isAuthChecked}))
    }
    
    const logout = () => {
        clearToken()
        setAuthState((prev) => ({...prev, user:null, isAuthenticated : false}))
    }
    
    return (
        <AuthContext.Provider value={{ authState, login, logout, setIsAuthChecked }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context
}
