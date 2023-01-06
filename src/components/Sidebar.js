import React, { useContext, useEffect, useState } from 'react'

import { AuthContext } from '../auth/AuthContext'
import { ChatContext } from '../context/chat/ChatContext'

import { SidebarChatItem } from './SidebarChatItem'



export const Sidebar = () => {

    // const chats = [1, 2, 3, 4, 5, 6]

    // ** UseContext ==> ChatContext
    const { chatState } = useContext(ChatContext)
    console.log(chatState)
    const { usuarios } = chatState

    const [data, setData] = useState([])
    // const [term, setTerm] = useState("")

    useEffect(() => {
        setData(usuarios)
    }, [usuarios])


    // ** UseContext ==> AuthContext
    const { auth } = useContext(AuthContext)
    const { uid } = auth

    // const handleChange = (e)=>{
    //     setTerm(e.target.value)
    //     filtrar(e.target.value)
    // }

    // const filtrar = (terminoBusqueda) =>{
    //     let resultadoBusqueda = data.filter((elemento)=>{
           

    //     })
    //     setData(resultadoBusqueda)
    // }

    return (
        <>
            {/* <!-- Sidebar inicio CHATS Conectados --> */}
            {/* <input
                className='headind_srch'
                placeholder='busqueda'
                value={term}
                onChange={handleChange}
            /> */}
            <div className="inbox_chat">
                {
                    data
                        .filter(user=>user.uid !== uid) // Para quitar al usuario que esta conectado
                        .map((usuario) => (
                            <SidebarChatItem
                                key={usuario.uid}
                                chat={usuario}
                            />
                        ))
                }



                {/* <!-- Espacio extra para scroll --> */}
                <div className="extra_space"></div>

            </div>
        </>
    )
}

