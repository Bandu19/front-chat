// Ruta SECUNDARIA de la Aplicación
import React from 'react'
import { Routes, Route, Navigate } from "react-router-dom"
import { LoginPage, RegisterPage } from '../pages'
/*Importar Estilos CSS */
import '../css/login-register.css'
// import { NotFound404 } from '../pages/NotFound404'

export const AuthRouter = () => {
    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-t-50 p-b-90 fw-bold">
                    <Routes>
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="/*" element={<Navigate to="login" />} />
                        {/* <Route path="*" element={<NotFound404/>} />  */}
                    </Routes>
                </div>
            </div>
        </div>

    )
}
