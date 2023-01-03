import React, { useContext } from 'react'
import { InboxPeople, Messages } from '../components'
import { ChatSelect } from '../components/ChatSelect'
import { ChatContext } from '../context/chat/ChatContext'
import '../css/chat.css'

export const ChatPage = () => {

    // ** UseContext ==> ChatContext
    const {chatState} = useContext(ChatContext)

    return (
        <div className="messaging">
            <div className="inbox_msg">
                {/* Barra de los Usuarios */}
                <InboxPeople />

                {/* Barra de los Mensajes del Chat */}
                {
                    // AQUI TENGO QUE INGRESAR LOS CAMBIOS PARA LAS NOTIFICATION    
                    (chatState.chatActivo) 
                        ? <Messages /> : <ChatSelect />
                }

            </div>


        </div>
    )
}

