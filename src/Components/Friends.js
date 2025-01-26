import React, { useState } from 'react'
import { useAuth } from '../Contexts/AuthContext'

function Friends({menuButtons,setMenuButtons}) {

    // const { authState } = useAuth()
    let authState = {
        user : {
            friends : [
            {
                email : "123@gamil.com",
                profile_img : "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg"
            },
            {
                email : "abc@gmail.com",
                profile_img : "https://upload.wikimedia.org/wikipedia/en/thumb/9/94/NarutoCoverTankobon1.jpg/220px-NarutoCoverTankobon1.jpg"
            }
    ]}}

    const [email, setEmail] = useState('')

    return <div className='friends-and-chats'>

        <button className='close-btn' onClick={()=>{setMenuButtons({...menuButtons,friendsAndChat : true})}}>x</button>

        <div className='friends' onClick={(e)=>{e.stopPropagation()}}>

            <input type="text" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Search friends" className=" default-input"/>

            {
                authState.user.friends.length > 0 ? authState.user.friends.map((friend)=>{
                    return <div className='friend-display'>
                        <img src={friend.profile_img}></img>
                        <span>{friend.email}</span>
                    </div>
                }) : <></> 
            }
        </div>

        <div className='chats'>

        </div>
    </div>  
}

export default Friends