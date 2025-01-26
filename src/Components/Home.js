import React, { useState } from 'react'
import Header from './Header'
import EmailSearch from './EmailSearch'
import Draggable from './Draggable'
import Friends from './Friends'

function Home() {
    
    const [exitingState, setExitingState] = useState({
        searchFriends: false,
        friendsAndChat: false,
    })

    const [menuButtons, setMenuButtons] = useState({
        searchFriends: false,
        friendsAndChat: false,
    })

    const hideSearchFriends = () => {
        setExitingState({ ...exitingState, searchFriends: true })
        setTimeout(() => {
            setMenuButtons({ ...menuButtons, searchFriends: false })
            setExitingState({ ...exitingState, searchFriends: false })
        }, 300)
    }

    const hideFriendsAndChat = () => {
        setExitingState({ ...exitingState, friendsAndChat: true })
        setTimeout(() => {
            setMenuButtons({ ...menuButtons, friendsAndChat: false })
            setExitingState({ ...exitingState, friendsAndChat: false })
        }, 300)
    }

    return (
        <div className='home'>
            <Header />
            {
                !menuButtons.searchFriends ? 
                    <Draggable className="email-search-initial" initialCoordinates={{ x: 34, y: 56 }}>
                        <EmailSearch setMenuButtons={setMenuButtons} menuButtons={menuButtons} />
                    </Draggable>
                : 
                <button className={`menu-button search-friends-menu-button ${exitingState.searchFriends ? 'animated-button-exit' : 'animated-button-enter'}`} onClick={hideSearchFriends}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-person-plus-fill" viewBox="0 0 16 16">
                        <path d="M1 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                </button>
            }
            {
                !menuButtons.friendsAndChat ? <Draggable className="friends-initial" initialCoordinates={{ x: 269, y: 76 }}>
                        <Friends setMenuButtons={setMenuButtons} menuButtons={menuButtons} />
                    </Draggable>
                : 
                <button className={`menu-button-2 chat-and-friends-menu-button ${exitingState.friendsAndChat ? 'animated-button-exit' : 'animated-button-enter'}`}onClick={hideFriendsAndChat}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" className="bi bi-chat-dots-fill" viewBox="0 0 16 16">
                        <path d="M16 8c0 3.866-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.584.296-1.925.864-4.181 1.234-.2.032-.352-.176-.273-.362.354-.836.674-1.95.77-2.966C.744 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7M5 8a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                    </svg>
                </button>
            }
        </div>
    )
}

export default Home
