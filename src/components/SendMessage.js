import React, { useContext, useState } from 'react'

import { SocketContext } from '../context/SocketContext'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'

export const SendMessage = () => {

    const [mensaje, setMensaje] = useState('')

    // ** UseContext => SocketContext
    const { socket } = useContext(SocketContext)

    // ** UseContext => AuthContext
    const { auth,prueba } = useContext(AuthContext)

    // ** UseContext ==> ChatContext
    const { chatState } = useContext(ChatContext)
    // console.log(chatState)

    const onChange = ({ target }) => {
        setMensaje(target.value)
    }


    const onSubmit = (ev) => {
        ev.preventDefault()

        if (mensaje.length === 0) {
            return
        }

        // // TODO: NOTIFICACIONES
        // let valor = notificacion + 1
        // setNotificacion(valor)
        
        console.log(auth.uid,chatState.chatActivo)
        const ok = prueba(auth.uid,chatState.chatActivo)
        console.log(ok)

        // TODO: Emitir un evento de sockets para enviar el mensaje
        socket.emit('mensaje-personal', {
            de: auth.uid, // UID del usuario enviaando el mensaje
            para: chatState.chatActivo, // UID del usuario que recibe el mensaje
            mensaje, // lo que quiero enviar
        })

        console.log(mensaje)
        setMensaje('')
    }

    return (
        <>
            {/* <!-- Enviar mensaje Inicio --> */}
            <form onSubmit={onSubmit}>
                <div className="type_msg row">
                    <div className="input_msg_write col-sm-9">
                        <input
                            type="text"
                            className="write_msg"
                            placeholder="Mensaje..."
                            value={mensaje}
                            onChange={onChange}
                        />
                    </div>
                    <div className="col-sm-3 text-center">
                        <button
                            className="msg_send_btn mt-3"
                            type="submit"
                        >
                            enviar
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
