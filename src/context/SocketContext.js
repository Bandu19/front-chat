import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../auth/AuthContext'
// import { scrollToBottomAnimated } from '../helpers/scrollToBottom'
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types'
import { ChatContext } from './chat/ChatContext'

export const SocketContext = createContext()  // UTILIZA

export const SocketProvider = ({ children }) => {

    // Cusstom Hook
    // Conectandome al servidor del back en HEROKU
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('https://chat-back-production.up.railway.app/')

    // UseContext => AuthContext
    const { auth } = useContext(AuthContext)

    // UseaContext => ChatContext
    const {dispatch} = useContext(ChatContext)

    const [ContadorN, setContadorN] = useState(0)
    // El efecto de la propiedad AUTH
    useEffect(() => {

        if (auth.logged) {
            conectarSocket()
        }
        
        // else{
        //     desconectarSocket()
        // }

    }, [auth, conectarSocket])

    useEffect(() => {

        if (!auth.logged) {
            desconectarSocket()
        }

    }, [auth, desconectarSocket])

    // Escuchar los cambios en los usuarios conectados
    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            console.log(usuarios)
            
            // El dispatch es una funcion memorizada
            dispatch({
                type:types.usuariosCargados,
                payload: usuarios
            })
        })

    }, [socket,dispatch])

    useEffect(()=>{
        socket?.on('mensaje-personal',(mensajePersonal)=>{
            // console.log(mensaje.mensajePersonal)

            dispatch({
                type: types.nuevoMensaje,
                payload: mensajePersonal
            })

            // scrollToBottomAnimated('mensajes')
        })
    },[socket,dispatch])

    // Puerto de comunicación de Notification
    useEffect(()=>{
        socket?.on('notificacion-personal',({contador,mensajePersonal})=>{
            console.log(contador)
            // console.log(notificacion.notifyc)
            console.log(mensajePersonal)

            setContadorN(contador)
            
            dispatch({
                type: types.nuevaNotificacion,
                payload: {contador,mensajePersonal}
            })
        })
    },[socket, dispatch])



    return (

        <SocketContext.Provider value={{ socket, online, ContadorN }}>
            {children}
        </SocketContext.Provider>

    )

}