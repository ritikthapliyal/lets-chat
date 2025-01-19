import React, { useState, useRef, useEffect } from 'react'
import { signIn, signUp } from '../Apis/AuthApis'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'
import { useNavigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { useAuth } from '../Contexts/AuthContext'
import { useNotification } from '../Contexts/NotificationContext'

function Landing() {

    const [isSignInClicked, setIsSignInClicked] = useState(false)
    const [isEmailMovedUp, setIsEmailMovedUp] = useState(false)
    const [email, setEmail] = useState("abc@gmail.com")
    const [password, setPassword] = useState("12345")
    const passwordInputRef = useRef(null)
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })

    const [loading,setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { login } = useAuth()
    const { setInitialNotification } = useNotification()

    const handleSnackbarClose = () => {
        setSnackbar({ open: false, message: '', severity: '' })
    }

    const SlideTransition = (props) => {
        return <Slide {...props} direction="left" />
    }

    const handleSubmit = async () => {
        
        setIsLoading(true)
        const {message,success} = isSignInClicked ? await signIn(email, password, login, setInitialNotification) : await signUp(email,login,setInitialNotification)
        setIsLoading(false)

        if(!success){
            setSnackbar({
                open: true,
                message: message || 'An error occurred',
                severity: 'error',
            })
        }
        else{
            navigate('/')
        }
    }

    useEffect(() => {
        if (isSignInClicked && isEmailMovedUp) {
            passwordInputRef.current.focus()
        }
    }, [isSignInClicked, isEmailMovedUp])

    const handleSignInClick = async () => {

        if(isSignInClicked && isEmailMovedUp){
            if(password.length > 0 && email.length > 0) await handleSubmit()
            else {
                setSnackbar({
                    open: true,
                    message:'Email and Password are required',
                    severity: 'error',
                })
            }
        }
        else{
            setIsSignInClicked(true)
            setIsEmailMovedUp(true)
        }

    }

    const handleSignUpClick = async () => {

        if(!isSignInClicked && !isEmailMovedUp){
            if(email.length > 0){
                await handleSubmit()
            } 
            else{
                setSnackbar({
                    open: true,
                    message: 'Email is required',
                    severity: 'error',
                })
            }
        }
        
        if(isSignInClicked !== false){
            setIsSignInClicked(false)
            setIsEmailMovedUp(false)
        }
        
    }

    return (
        <div className='homepage-container vertical-center'>
            <input type='email' onChange={(e)=>{setEmail(e.target.value)}} placeholder='abc@gmail.com' className={`default-input ${isEmailMovedUp ? 'move-up' : ''}`} style={{transform: isEmailMovedUp ? "" :'translateY(32px)'}}/>
            <div className={`password-input ${isSignInClicked ? 'show' : ''}`}>
                <input type="password" onChange={(e)=>{setPassword(e.target.value)}} placeholder="Enter your password" className="default-input" ref={passwordInputRef}/>
            </div>

            {
                loading 
                ? 
                <div className="homepage-buttons horizontal-center">
                    <div className="loading-spinner-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                        <CircularProgress style={{ color: 'black', size: '10px' }} />
                    </div>
                </div>
                :
                <div className="homepage-buttons horizontal-center">
                    <button onClick={handleSignUpClick} className='site-button-1'>SignUp</button>
                    <button onClick={handleSignInClick} className='site-button-1'>SignIn</button>
                </div>
            }
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                TransitionComponent={SlideTransition}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbar.severity}
                    sx={{ width: '100%' }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </div>  
    )
}

export default Landing
