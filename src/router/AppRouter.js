// Ruta Principal de la Aplicación
import React, { useContext, useEffect } from 'react'

import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate
} from "react-router-dom"
import { AuthContext } from '../auth/AuthContext'

import { ChatPage } from '../pages'
import { AuthRouter } from './AuthRouter'
import { PrivateRoute } from './PrivateRoute'
import { PublicRoute } from './PublicRoute'

export const AppRouter = () => {

    // Extraer mi useContext
    const { auth, verificaToken } = useContext(AuthContext)
    // console.log(auth)

    // Cuando el verificaToken cambie tiene que ir
    useEffect(() => {
        verificaToken()
    }, [verificaToken])

    // Este es nuestro spiner
    if (auth.checking) {
        return <h1>Espere por favor</h1>
    }

    return (
        <>
            <Router>
                <Routes>
                    {/* <Route path="chatPages" element={<ChatPage />} /> */}
                    {/* <Route path="/auth/*" element={<AuthRouter />} /> */}
                    {/* <Route path="*" element={<p>La página no existe.</p>} /> va hasta abajo */}


                    <Route
                        path="chatPages"
                        element={
                            <PrivateRoute isAuthenticated={auth.logged}>
                                <ChatPage />
                            </PrivateRoute>
                        }
                    />

                    <Route
                        path="/auth/*"
                        element={
                            <PublicRoute isAuthenticated={auth.logged}>
                                <AuthRouter />
                            </PublicRoute>
                        }
                    />
                    {/*El /* es para que cuando se ingrese un path erroneo lo rediriga al principal */}
                    <Route path="/*" element={<Navigate to="/chatPages" />} />


                </Routes>
            </Router>
        </>
    )
}

