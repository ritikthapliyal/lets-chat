import { decryptAndReconstructToken } from "../utils"

let ws
const callbackMap = new Map()

export const connectWebSocket = (addNotification) => {
    
    if (ws && ws.readyState === WebSocket.OPEN) {
        console.log("WebSocket already connected...")
        return
    }
    else{
        const token = decryptAndReconstructToken()
        ws = new WebSocket(`wss://socket.ritikprojects.xyz/?token=${encodeURIComponent(token)}`)
    }

    ws.onopen = () => {console.log("Socket connected")}

    ws.onmessage = (event) => {
        
        const message = JSON.parse(event.data)
        console.log("Message from server:", message)

        switch (message.eventName) {
            
            case "newFriendRequest":
                addNotification(message.notification)
                break

            case "onSendFriendRequest":
                const callbacks = callbackMap.get("onSendFriendRequest")
                if (callbacks) {
                    const { setSnackbar, setIsSending } = callbacks
                    handleSendFriendRequest(message, setSnackbar, setIsSending)
                    callbackMap.delete("onSendFriendRequest")
                }
                break

            default:
                console.log("Unhandled event:", message)
        }
    }

    ws.onclose = () => {console.log("Disconnected from WebSocket")}

    ws.onerror = (error) => {console.error("WebSocket error:", error)}
}

const handleSendFriendRequest = (message, setSnackbar, setIsSending) => {
    if (message.success) setSnackbar({ open: true, message: message.message, severity: "success" })
    else setSnackbar({ open: true, message: message.message, severity: "error" })
    setIsSending(0)
}

export const sendFriendRequest = (email, setSnackbar, setIsSending) => {

    if (ws && ws.readyState === WebSocket.OPEN) {
        
        const token = decryptAndReconstructToken();
        const payload = {
            action: "send-friend-request",
            data: { email, token },
        }
        callbackMap.set("onSendFriendRequest", { setSnackbar, setIsSending })
        ws.send(JSON.stringify(payload))
    } 
    else {
        setSnackbar({ open: true, message: "You are offline", severity: "error" })
        setIsSending(0)
    }
}

