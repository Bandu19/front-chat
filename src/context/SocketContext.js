import React, { createContext, useContext, useEffect } from 'react'
import { AuthContext } from '../auth/AuthContext'
import { useSocket } from '../hooks/useSocket'

export const SocketContext = createContext()  // UTILIZA

export const SocketProvider = ({ children }) => {

    // Cusstom Hook
    // Conectandome al servidor del back en HEROKU
    const { socket, online, conectarSocket, desconectarSocket } = useSocket('http://localhost:8080')

    // UseContext => AuthContext
    const { auth } = useContext(AuthContext)

    // El efecto de la propiedad AUTH
    useEffect(() => {

        if (auth.logged) {
            conectarSocket()
        }

    }, [auth, conectarSocket])

    useEffect(() => {

        if (!auth.logged) {
            desconectarSocket()
        }

    }, [auth, desconectarSocket])



    return (

        <SocketContext.Provider value={{ socket, online }}>
            {children}
        </SocketContext.Provider>

    )

}