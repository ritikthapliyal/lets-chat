import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Landing from './Components/Landing'
import { AuthProvider, useAuth } from './Contexts/AuthContext'
import Home from './Components/Home'
import { getUserDetails } from './Apis/UserApis'
import { decryptAndReconstructToken } from './utils'
import { useNotification } from './Contexts/NotificationContext'

function App() {
    return (
        <AuthProvider>
            <Router basename="/">
                <MainApp />
            </Router>
        </AuthProvider>
    )
}

function MainApp() {
    
    const { authState, login , setIsAuthChecked } = useAuth()
    const { setInitialNotification } = useNotification()

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const token = decryptAndReconstructToken();

                if (token && !authState?.isAuthenticated) {
                    const { userData, success, notifications } = await getUserDetails(token)
                    if (success){
                        login(userData)
                        setInitialNotification(notifications)
                    } 
                    else throw new Error("Wasn't able to login")
                }
                else throw new Error("Token not found")
            } 
            catch (err) {console.log(err.message)}
            finally{ setIsAuthChecked(true)}   
        }

        if(authState !== undefined && authState?.isAuthChecked === false) checkAuth()

    }, [])

    if (!authState?.isAuthChecked) {
        return <div style={{width : "100%", height : "100%", paddingTop:"50vh"}} className='horizontal-center'>Loading...</div>
    }

    return (
        <div className="app">
            <Routes>
                <Route path="/" element={authState?.isAuthenticated ? <Home /> : <Landing />}/>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </div>
    )
}

export default App;
