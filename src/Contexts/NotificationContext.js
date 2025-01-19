import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    
    const [notifications, setNotifications] = useState([])

    const addNotification = (notification) => {
        if(notification)setNotifications((prev) => [ notification, ...prev])
    }

    const setInitialNotification = (notifications) => setNotifications(notifications)

    const clearNotifications = () => setNotifications([])

    return (
        <NotificationContext.Provider value={{notifications, addNotification, setInitialNotification, clearNotifications}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useNotification must be used within a NotificationProvider')
    return context
}
