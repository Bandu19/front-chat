import React, { useContext } from 'react'

import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'

import { SidebarChatItem } from './SidebarChatItem'

export const Sidebar = () => {

    // const chats = [1, 2, 3, 4, 5, 6]
    
    // ** UseContext ==> ChatContext
    const {chatState} = useContext(ChatContext)
    
    // ** UseContext ==> AuthContext
    const {auth} = useContext(AuthContext)
    const {uid} = auth
    return (
        <>
            {/* <!-- Sidebar inicio CHATS Conectados --> */}
            <div className="inbox_chat">

                {
                    chatState?.usuarios
                        .filter(user=>user.uid !== uid) // Para quitar al usuario que esta conectado
                        .map((usuario) => (
                        <SidebarChatItem 
                            key={usuario.uid} 
                            chat={usuario}
                        />
                    ))
                }


                {/* <!-- conversación inactiva inicio --> */}
                <div className="chat_list">

                    <div className="chat_people">
                        <div className="chat_img">
                            <img src="https://imgs.search.brave.com/jjizMxNTRgX8Jd1PNu7XXsh0-_jVVpSJF-bVeHWJZ_c/rs:fit:860:900:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzc4LTc4/NjIwN191c2VyLWF2/YXRhci1wbmctdXNl/ci1hdmF0YXItaWNv/bi1wbmctdHJhbnNw/YXJlbnQucG5n" alt="sunil" />
                        </div>
                        <div className="chat_ib">
                            <h5>Sunil Rajput <span className="chat_date">Dec 25</span></h5>
                            <p>Test, which is a new approach to have all solutions
                                astrology under one roof.</p>
                        </div>
                    </div>

                </div>

                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>

            </div>
        </>
    )
}

