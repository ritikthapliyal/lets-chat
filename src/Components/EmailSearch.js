import React, { useState } from 'react'
import { getEmailSuggestions } from '../Apis/UserApis'
import { debounce } from 'lodash'
import { useAuth } from '../Contexts/AuthContext'
import { sendFriendRequest } from '../Apis/Socket'

import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import Slide from '@mui/material/Slide'

const EmailSearch = ({menuButtons,setMenuButtons}) => {

    
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: '' })
    const handleSnackbarClose = () => {setSnackbar({ open: false, message: '', severity: '' })}
    const SlideTransition = (props) => {return <Slide {...props} direction="left" />}
    
    const [email, setEmail] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isSending, setIsSending] = useState(0)
    const [emailSuggestions, setEmailSuggestions] = useState([])
    const {authState, logOut} = useAuth()

    const fetchEmails = async (searchTerm) => {
        setIsLoading(true)
        if (searchTerm) { 
            const { success, emailList, code } = await getEmailSuggestions(searchTerm)
            if (success) setEmailSuggestions(emailList)
            else if(code === 401) logOut() 
        } 
        else setEmailSuggestions([])
        setIsLoading(false)
    }

    const debouncedFetchEmails = debounce(fetchEmails, 300)

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setEmail(newValue)
        debouncedFetchEmails(newValue)
    }

    const handleSendFriendRequest = async (friendEmail,index) => {
        setIsSending(index)
        sendFriendRequest(friendEmail,setSnackbar,setIsSending)
    }

    const getHighlightedText = (suggestion, highlight, index) => {
        
        const text = suggestion.email
        const regex = new RegExp(`^(${highlight})`, 'i')
        const match = text.match(regex)
    
        if (match) {
            return (
                <span className='suggestion-span'>
                    <span>{match[0]}</span>{text.slice(match[0].length)}
                    {
                        isSending !== index ? (suggestion.isRequestSent 
                            ? <button className='horizontal-center undo-request' onClick={()=>{handleSendFriendRequest(text,index)}}>-</button> 
                            : <button className='horizontal-center send-request' onClick={()=>{handleSendFriendRequest(text,index)}}>+</button>) 
                        :   <div className="three-dots">
                                <span className="dot"></span>
                                <span className="dot"></span>
                            </div>
                    }
                </span>
            )
        }
        return text
    }

    return (
        <div className='email-search'>

            <button className='close-btn' onClick={()=>{setMenuButtons({...menuButtons,searchFriends : true})}}>x</button>

            <input type="text" value={email} onChange={handleInputChange} placeholder="Search friends" className=" default-input"/>

            {   
                isLoading ? <p className='email-search-loading'>Loading...</p> :
                emailSuggestions.length > 0 ? 
                    <ul className="site-list">
                        {
                            emailSuggestions.map((suggestion, index) => {
                                if(suggestion.email === authState.user.email) return null
                                else return <li key={`li-${index+1}`} className="site-list-item">
                                    { getHighlightedText(suggestion, email,index+1) }
                                </li>
                            })
                        }
                    </ul>
                : (email.length > 0 && <p className='email-search-loading'>Email not found</p>)
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

export default EmailSearch
