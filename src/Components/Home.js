import React, { useState } from 'react'
import Header from './Header'
import EmailSearch from './EmailSearch'
import Draggable from './Draggable'


function Home() {

    const [isExiting, setIsExiting] = useState(false)
    const [menuButtons,setMenuButtons] = useState({
        searchFriends : false
    })

    const hideSearchFriends = () => {
        setIsExiting(true)
        setTimeout(() => {
            setMenuButtons({ ...menuButtons, searchFriends: false })
            setIsExiting(false)
        }, 300)
    }

    return (
        <div className='home'>
            <Header/>

            {
                !menuButtons.searchFriends ? <Draggable className="email-search-initial" initialCoordinates={{ x: 34, y: 56 }}>
                    <EmailSearch setMenuButtons={setMenuButtons} menuButtons={menuButtons}/>
                </Draggable> 
                : 
                <button className={`menu-button search-friends-menu-button ${isExiting ? "animated-button-exit" : "animated-button-enter"}`} onClick={()=>{hideSearchFriends()}}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6"/>
                        <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            }
        </div>
    )
}

export default Home