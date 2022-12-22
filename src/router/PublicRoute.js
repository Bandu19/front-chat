import React from 'react'
import { Navigate } from 'react-router'
import { AuthRouter } from './AuthRouter'

export const PublicRoute = ({ isAuthenticated }) => {
    // console.log(isAuthenticated)
    // Si alguien no esta authenticado y entra en esta ruta
    return !isAuthenticated ? <AuthRouter /> : <Navigate to="/" />
}
