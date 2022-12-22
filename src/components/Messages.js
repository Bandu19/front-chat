import React from 'react'
import { IncomingMessage } from './IncomingMessage'
import { OutgoingMessage } from './OutgoingMessage'
import { SendMessage } from './SendMessage'

export const Messages = () => {
    return (
        <>
            {/* <!-- Chat inicio --> */}
            <div className="mesgs">
                <div className="msg_history">

                    {/* <!-- Recibir Mensaje--> */}
                    <IncomingMessage />

                    {/* <!-- Mensaje Enviado--> */}
                    <OutgoingMessage />

                </div>

                {/* <!-- Enviar Mensaje --> */}
                <SendMessage />

            </div>
        </>
    )
}
