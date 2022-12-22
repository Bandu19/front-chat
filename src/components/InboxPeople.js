import React from 'react'
import { Searchbox } from './Searchbox'
import { Sidebar } from './Sidebar'

export const InboxPeople = () => {
    return (
        <>
            {/* <!-- Inbox people inicio --> */}
            <div className="inbox_people">
                {/* <!-- Boton de Recientes y el Boton de Salir --> */}
                <Searchbox />

                {/* <!-- Usuarios que estan en el Chat --> */}
                <Sidebar />

            </div>
        </>
    )
}


