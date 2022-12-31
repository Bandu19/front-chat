import React, { createContext, useContext, useEffect } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useSocket } from '../hooks/useSocket'
import { types } from '../types/types'
import { ChatContext } from './chat/ChatContext'

export const SocketContext = createContext()  // UTILIZA

export const SocketProvider = ({ children }) => {

    // Cusstom Hook
    // Conectandome al servidor del back en HEROKU
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080')

    // UseContext => AuthContext
    const { auth } = useContext(AuthContext)

    // UseaContext => ChatContext
    const {dispatch} = useContext(ChatContext)

    // El efecto de la propiedad AUTH
    useEffect(() => {

        if (auth.logged) {
            conectarSocket()
        }else{
            desconectarSocket()
        }

    }, [auth, conectarSocket])

    // useEffect(() => {

    //     if (!auth.logged) {
    //         desconectarSocket()
    //     }

    // }, [auth, desconectarSocket])

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
        socket?.on('mensaje-personal',(mensaje)=>{
            console.log(mensaje)
        })
    },[socket])


    return (

        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>

    )

}