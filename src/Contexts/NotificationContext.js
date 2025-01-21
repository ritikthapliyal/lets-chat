import React, { createContext, useState, useContext } from 'react'

const NotificationContext = createContext()

export const NotificationProvider = ({ children }) => {
    
    const [notifications, setNotifications] = useState([])

    const addNotification = (notification) => {
        if(notification)setNotifications((prev) => [notification, ...prev])
    }

    const setInitialNotification = (notifications) => setNotifications(notifications)

    const updateNotification = (data) => {
        const { notificationId, updatedNotificationMessage } = data
        setNotifications((prev) =>
            prev.map((notification) =>
                notification._id === notificationId
                    ? { ...notification, message: updatedNotificationMessage, type : data.type}
                    : notification
            )
        )
    }

    const removeNotification = (id) => {
        setNotifications((prev) =>
            prev.filter((notification) => notification._id !== id)
        )
    }

    const clearNotifications = () => setNotifications([])

    return (
        <NotificationContext.Provider value={{notifications, removeNotification, addNotification, setInitialNotification, clearNotifications, updateNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotification = () => {
    const context = useContext(NotificationContext)
    if (!context) throw new Error('useNotification must be used within a NotificationProvider')
    return context
}
