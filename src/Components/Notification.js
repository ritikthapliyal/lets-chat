import React, { useEffect, useState } from 'react'
import { useNotification } from '../Contexts/NotificationContext'
import { acceptOrRejectFriendRequest } from '../Apis/RequestApis'

function Notification() {

    const [showNotificationList,setShowNotificationList] = useState(false)
    const [isLoading,setIsLoading] = useState(false)
    const [unreadCount,setUnreadCount] = useState(0)
    const { notifications, removeNotification, markAsRead } = useNotification()

    const handleFriendRequest = async (action,notificationId,requestId) => {
        setIsLoading(true)
        await acceptOrRejectFriendRequest(action,notificationId,requestId)
        setIsLoading(false)
    }

    useEffect(()=>{
        if(notifications.length > 0){
            const unread = notifications.filter((notification) => !notification?.hasRead).length
            setUnreadCount(unread)
        }
    },[notifications])
    
    return (
        <div className='notification'>
            { unreadCount > 0 && <span className='unread-count'>{unreadCount}</span> }
            <button className='notification-button' onClick={()=>{setShowNotificationList(true)}}>
                <svg viewBox="0 0 24 24" fill="#343C54" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
                    <path fill-rule="evenodd" clip-rule="evenodd" d="M12.0016 2.00098C12.4158 2.00098 12.7516 2.33676 12.7516 2.75098V3.53801C16.5416 3.9143 19.5016 7.11197 19.5016 11.001V14.115L20.1938 15.9609C20.7454 17.4319 19.6581 19.001 18.0871 19.001H15.0628C15.0287 20.6631 13.6701 21.9995 11.9998 21.9995C10.3295 21.9995 8.97089 20.6631 8.93682 19.001H5.9161C4.34514 19.001 3.25776 17.4319 3.80936 15.9609L4.5016 14.115V11.001C4.5016 7.11197 7.46161 3.9143 11.2516 3.53801V2.75098C11.2516 2.33676 11.5874 2.00098 12.0016 2.00098ZM10.4375 19.001C10.471 19.8339 11.1573 20.4995 11.9998 20.4995C12.8423 20.4995 13.5286 19.8339 13.5622 19.001H10.4375ZM6.0016 11.001C6.0016 7.68727 8.68789 5.00098 12.0016 5.00098C15.3153 5.00098 18.0016 7.68727 18.0016 11.001V14.1168C18.0016 14.2955 18.0337 14.4727 18.0965 14.64L18.7893 16.4876C18.9732 16.9779 18.6108 17.501 18.0871 17.501H5.9161C5.39244 17.501 5.02998 16.9779 5.21385 16.4876L5.90673 14.64C5.96946 14.4727 6.0016 14.2955 6.0016 14.1168V11.001Z" fill="#343C54"/>
                </svg>
            </button>
            {
                showNotificationList && notifications.length > 0 && 
                    <ul className="site-list" onMouseLeave={()=> setTimeout(() => {setShowNotificationList(false)}, 150)}>
                        {
                            notifications.map((notification, index) => {
                                
                                if(notification.type === 'friend-request'){
                                    return <li key={`li-${index+1}`} className="site-list-item friend-request-item">
                                        <span>{notification.message}</span>
                                        {
                                            isLoading ? <div className="three-dots">
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                                <span className="dot"></span>
                                            </div>  
                                            : 
                                            <div>
                                                <button onClick={()=>{handleFriendRequest("accepted",notification._id,notification.requestId)}}>Accept</button>
                                                <button onClick={()=>{handleFriendRequest("rejected")}}>Reject</button>
                                            </div>
                                        }
                                    </li>
                                }
                                else{
                                    return <li key={`li-${index+1}`} className="site-list-item">
                                        {notification.message}
                                    </li>
                                }
                                
                            })
                        }
                    </ul>    
            }
            {
                showNotificationList && notifications.length === 0 && <ul className="site-list" onMouseLeave={()=> setTimeout(() => {setShowNotificationList(false)}, 150)}>
                    <li className="site-list-item" style={{textAlign : "center"}}>
                        <span>No Notifications yet</span>
                    </li>
                </ul>
            }
        </div>
    )
}

export default Notification