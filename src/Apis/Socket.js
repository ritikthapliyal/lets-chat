import { decryptAndReconstructToken } from "../utils"

let ws

export const connectWebSocket = (addNotification) => {
  
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log('WebSocket already connected...')
        return
    }

    const token = decryptAndReconstructToken()
    ws = new WebSocket(`wss://socket.ritikprojects.xyz/?token=${encodeURIComponent(token)}`)

    ws.onopen = () => {console.log('Socket connected')}

    ws.onmessage = (event) => {
        const message = JSON.parse(event.data)
        console.log('Message from server:', message)
        if (message.eventName === "newFriendRequest") {
            addNotification(message.requestId,message.message,"friend-request",false)
        }
    }

    ws.onclose = () => {
        console.log('Disconnected from WebSocket')
    }

    ws.onerror = (error) => {
        console.error('WebSocket error:', error)
    }

}

export const sendFriendRequest = (email,setSnackbar,setIsSending) => {
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data)
        console.log('data from server:', data)
        if(data.eventName === 'onSendFriendRequest'){
            if(data?.success) setSnackbar({open: true,message: data.message,severity: 'success'})
            else setSnackbar({open: true,message: data.message,severity: 'error'})
            setIsSending(0)
        }
    }

    if (ws && ws.readyState === WebSocket.OPEN) {
        
        const token = decryptAndReconstructToken()
        
        const payload = {
            action: 'send-friend-request',
            data: { email, token },
        }

        ws.send(JSON.stringify(payload))
    } 
    else {
        setSnackbar({open: true,message: "You are offline",severity: 'error'})
        setIsSending(0)
    }
}
