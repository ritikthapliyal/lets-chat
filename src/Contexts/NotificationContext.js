import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([])

    const addNotification = (message, type = 'info') => {
        const id = Date.now();
        setNotifications((prev) => [...prev, { id, message, type }])
    }

    const removeNotification = (id) => {
        setNotifications((prev) => prev.filter((notification) => notification.id !== id))
    }

    const clearNotifications = () => {
        setNotifications([])
    }

    return (
        <NotificationContext.Provider value={{notifications, addNotification, removeNotification, clearNotifications}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useNotification must be used within a NotificationProvider')
    return context
}
