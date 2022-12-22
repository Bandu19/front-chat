import React from 'react'
import { Navigate } from 'react-router'
import { ChatPage } from '../pages'

export const PrivateRoute = ({ isAuthenticated }) => {
    // console.log(isAuthenticated)
    // Si es true se queda en el menu del CHATPAGE
    return isAuthenticated ? <ChatPage /> : <Navigate to="/auth/login" />
}
