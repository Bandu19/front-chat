import React, { createContext, useReducer } from 'react'
import { chatReducer } from './chatReducer'

export const ChatContext = createContext()

const initialState = {
    uid: '',
    chatActivo: null, // UID del usaurio al que yo quiero enviar mensajes
    usuarios: [], // Todos los usuarios de la base de datos
    mensajes: [], // El chat seleccionado
    notificaciones: null
}

export const ChatProvider = ({ children }) => {

    const [chatState, dispatch] = useReducer(chatReducer, initialState)

    return (
        <ChatContext.Provider value={{
            chatState,
            dispatch
        }}>
            {children}
        </ChatContext.Provider>
    )
}
