import { useCallback, useEffect, useState } from "react"
import io from 'socket.io-client'

export const useSocket = (serverPath) => {


    const [socket, setSocket] = useState(null)

    // Evento online
    const [online, setOnline] = useState(false)

    // 
    const conectarSocket = useCallback(() => {

        const token = localStorage.getItem('token')

        const socketTemp = io(serverPath, {
            transports: ['websocket'],
            autoConnect: true,
            forceNew: true,
            query: {
                'x-token': token
            }
        })
        setSocket(socketTemp)

    }, [serverPath])

    const desconectarSocket = useCallback(() => {

        // Si el socket es TRUE => desconectate
        socket?.disconnect()

    }, [socket])


    // Si esta conectado de entrada
    useEffect(() => {
        setOnline(socket?.connected)
    }, [socket])

    // Conectando el servidor (BACK)
    useEffect(() => {
        socket?.on('connect', () => {
            setOnline(true)
        })
    }, [socket])

    // Desconectando el servidor (BACK)
    useEffect(() => {
        socket?.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket])



    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}


