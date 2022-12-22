import React from 'react'
import { InboxPeople, Messages } from '../components'
import { ChatSelect } from '../components/ChatSelect'
import '../css/chat.css'

export const ChatPage = () => {
    return (
        <div className="messaging">
            <div className="inbox_msg">
                {/* Barra de los Usuarios */}
                <InboxPeople />

                {/* Barra de los Mensajes del Chat */}
                {
                    (false) ? <Messages /> : <ChatSelect />
                }

            </div>


        </div>
    )
}

