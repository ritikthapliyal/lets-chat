import axios from 'axios'
import { REQUEST_URL } from './ApiConfic'
import { decryptAndReconstructToken } from '../utils'


export async function acceptOrRejectFriendRequest(action,notificationId,requestId) {
    try {
        
        const authToken = decryptAndReconstructToken()
        if(!authToken) return {message : "Token not found", success : false}

        const response = await axios.post(`${REQUEST_URL}/${requestId}`, 
            { action, notificationId }, 
            {  headers : {authorization : authToken } }
        )
        
        if (response?.data?.success) {
            console.log(response?.data)
        } 
        else return {message : "Something went wrong", success : false}

    } 
    catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong while logging you in"
        return {message : errorMessage, success : false}
    }
}