import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { getUserDetails } from '../Apis/UserApis';
import { decryptAndReconstructToken } from '../utils';

const PrivateRoute = ({ element: Element }) => {
    
    const { authState, login, logout } = useAuth()
    const [isAuthChecked, setIsAuthChecked] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = decryptAndReconstructToken()

                if (token && !authState?.isAuthenticated) {
                    const { userData, success } = await getUserDetails(token)
                    if (success) login(userData) 
                    else logout()
                }
            } 
            catch (err) { logout() } 
            finally { setIsAuthChecked(true) }
        }

        checkAuth()

    }, [authState?.isAuthenticated, login, logout])

    if (!isAuthChecked) { return <div>Loading...</div> }

    return authState?.isAuthenticated ? Element : <Navigate to="/" />

}

export default PrivateRoute
