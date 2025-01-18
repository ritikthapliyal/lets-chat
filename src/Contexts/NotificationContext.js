import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    
    const [notifications, setNotifications] = useState([
        // {id : 13423, message :"You have a new friend request by 123@gmail.com", type : "friend-request", hasRead : false },
        // {id : 13423, message :"this is a rndom message to test how it would look in the list that i am trying to make, shaka laka do do !!", type : "info", hasRead : false },
    ])

    const addNotification = (id, message, type, hasRead) => {
        setNotifications((prev) => [...prev, { id, message, type, hasRead }])
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
