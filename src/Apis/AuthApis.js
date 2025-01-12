// apis.js
import axios from 'axios'
import { AUTH_URL } from './ApiConfic'
import { splitAndEncryptToken } from '../utils'


export async function signIn(email, password, updateAuthContext) {
    try {
        
        const response = await axios.post(`${AUTH_URL}/sign-in`, {email,password})
        
        if (response?.data?.success) {
            const { token, userData } = response.data.data
            splitAndEncryptToken(token,userData.email)
            updateAuthContext(userData)
            return {message : "Success", success : true}
        } 
        else return {message : "Something went wrong", success : false}

    } 
    catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong while logging you in"
        return {message : errorMessage, success : false}
    }
}

export async function signUp(email, password) {
    
    try {
        
        const response = await axios.post(`${AUTH_URL}/sign-up`, {email,password})
        if (response.data.success) {
            console.log('SignUp successful!', response.data)
            return response.data
        } else {
            console.error('SignUp failed:', response.data.message)
            return null
        }
    } 
    catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong while signing you up"
        return {message : errorMessage, success : false}
    }
}
