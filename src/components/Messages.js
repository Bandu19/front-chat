import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'

export const Messages = () => {

    const {chatState} = useContext(ChatContext)
    console.log(chatState)
    
    const {auth} = useContext(AuthContext)
    return (
        <>
            {/* <!-- Chat inicio --> */}
            <div className="mesgs">
                <div
                    id="mensajes" 
                    className="msg_history"
                
                >
                    {
                        chatState.mensajes.map(msg=>(
                            //ID DIEGO == ID OSCAR
                            (msg.para === auth.uid)
                                /* <!-- Recibir Mensaje--> */
                                ? <IncomingMessage key={msg._id} msg={msg}/>
                                /* <!-- Mensaje Enviado--> */
                                : <OutgoingMessage key={msg._id} msg={msg}/>
                        ))
                    }

                </div>

                {/* <!-- Enviar Mensaje --> */}
                <SendMessage />

            </div>
        </>
    )
}
