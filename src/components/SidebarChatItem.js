import React, { useContext } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'
import { types } from '../types/types'

export const SidebarChatItem = ({ chat }) => {
    console.log(chat.uid)

    // ** UseContext ==> ChatContext
    const { chatState, dispatch } = useContext(ChatContext)
    console.log(chatState.mensajes)

    const {auth} = useContext(AuthContext)

    const { chatActivo,notificaciones } = chatState
    const activarChat = () => {

        // if(chat.uid && auth.logged){
        //     enviarNotificacion(1) // resetea
        // }
        dispatch({
            type: types.activarChat,
            payload: chat.uid
        })
    }
    return (
        <>
            {/* <!-- conversación activa inicio --> */}
            <div
                className={`chat_list ${(chat.uid === chatActivo) && 'active_chat'}`}
                onClick={activarChat}
            >
                {/* active_chat */}
                <div className="chat_people">
                    <div className="chat_img">
                        <img src="https://imgs.search.brave.com/jjizMxNTRgX8Jd1PNu7XXsh0-_jVVpSJF-bVeHWJZ_c/rs:fit:860:900:1/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzc4LTc4/NjIwN191c2VyLWF2/YXRhci1wbmctdXNl/ci1hdmF0YXItaWNv/bi1wbmctdHJhbnNw/YXJlbnQucG5n" alt="sunil" />
                    </div>
                    <div className="chat_ib">
                        <h5>{chat.nombre}</h5>
                        {
                            (chat.online)
                                ? <span className="text-success">Online</span>
                                : <span className="text-danger">Offline</span>
                        }
                    </div>
                        {
                            (notificaciones >= 0 && auth.uid  )
                                ?  null
                                : <div>N°:{notificaciones}</div>
                        }
                         {/* <div>N°:{notificaciones}</div> */}
                    

                </div>
            </div>

            {/* <div>
                {

                    (chatActivo === auth.uid)
                        ? <div>N°{notificaciones}</div>
                        : <div>N°{notificaciones}</div>

                    // (!chat.online)
                    // // ? <div>N°{notificaciones}</div>
                    // ? (chat.uid === chatActivo )
                    //     ? <div>N°{notificaciones}</div>
                    //     : null
                    // : null
                }
            </div> */}
        </>
    )
}
