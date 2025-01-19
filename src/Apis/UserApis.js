// apis.js
import axios from 'axios'
import { USER_URL, SEARCH_URL } from './ApiConfic' 
import { decryptAndReconstructToken } from '../utils'

export async function getUserDetails(token) {
    try {
        
        const authToken = token || decryptAndReconstructToken()
        if(!authToken) return {message : "Token not found", success : false}

        const response = await axios.get(`${USER_URL}/`, {headers: { 'Authorization': authToken}})
        
        if (response?.data?.success) {
            const userData = response.data.data
            const notifications = response.data.notifications || []
            return {message : "Success", userData, notifications, success : true} 
        } 
        else return {message : "Something went wrong", success : false}

    } 
    catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong while logging you in"
        return {message : errorMessage, success : false}
    }
}

export async function getEmailSuggestions(searchTerm) {
    try {
        
        const authToken = decryptAndReconstructToken()
        if(!authToken) return {message : "Token not found", success : false, code : 401}

        const response = await axios.get(`${SEARCH_URL}`, {headers: { 'Authorization': authToken},params: { query: searchTerm }})
        console.log(response.data)
        if (response?.data?.success) {
            const emailList = response.data.data
            return {message : "Success", emailList, success : true, code : 200} 
        } 
        else return {message : "Something went wrong", success : false, code : response.data.code}

    } 
    catch (error) {
        const errorMessage = error?.response?.data?.message || "Something went wrong while logging you in"
        return {message : errorMessage, success : false}
    }
}