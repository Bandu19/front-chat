import React, { createContext, useCallback, useContext, useState } from 'react'
import { ChatContext } from '../context/chat/ChatContext'
import { fetchConToken, fetchSinToken } from '../helpers/fetch'
import { types } from '../types/types'

export const AuthContext = createContext()

// Estado de la Autenticacion
const initialState = {
    uid: null, // UID del usuario
    checking: true, // SI el usuario esta autenticado o no
    logged: false,// si el usuario esta logeado
    name: null,
    email: null
}

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState(initialState)
    const {dispatch} = useContext(ChatContext)

    const login = async (email, password) => {
        // Llamar helpers/fetch.js
        const resp = await fetchSinToken('login', { email, password }, 'POST')
        console.log(resp)

        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            const { usuario } = resp
            console.log(usuario)

            setAuth({
                uid: usuario?.uid, // UID del usuario
                checking: false, // SI el usuario esta autenticado o no
                logged: true,// La autenticacion paso
                name: usuario?.nombre,
                email: usuario?.email
            })
            console.log("Autenticado")

        }
        return resp.ok // devolvemos es "true" o "false"
    }

    const register = async (nombre, email, password) => {

        const resp = await fetchSinToken('login/new', { nombre, email, password }, 'POST')
        console.log(resp)
        // TOKENS
        if (resp.ok) {
            localStorage.setItem('token', resp.token)
            const { usuario } = resp
            console.log(usuario)

            setAuth({
                uid: usuario?.uid, // UID del usuario
                checking: false, // SI el usuario esta autenticado o no
                logged: true,// La autenticacion paso
                name: usuario?.nombre,
                email: usuario?.email
            })
            console.log("Autenticado")
            return true

        }
        return resp
    }

    const verificaToken = useCallback(async () => {

        // Debe de leer el token del localStorage
        const token = localStorage.getItem('token')

        // Si token no existe
        if (!token) {
            setAuth({
                uid: null, // UID del usuario
                checking: false, // Ya tenemos el estado de la autenticacion
                logged: false,// si el usuario no esta logeado
                name: null,
                email: null
            })
            return false
        }

        // Si el token si existe
        const resp = await fetchConToken('login/renew')

        // Si es true 
        if (resp.ok) {

            // Restableces el token
            localStorage.setItem('token', resp.token)

            const { usuario } = resp
            // console.log(usuario)

            setAuth({
                uid: usuario?.uid,
                checking: false, // SI el usuario esta autenticado o no
                logged: true,// La autenticacion paso
                name: usuario?.nombre,
                email: usuario?.email
            })
            // console.log("Autenticado")
            return true

        } else {
            setAuth({
                uid: null, // UID del usuario
                checking: false, // SI el usuario esta autenticado o no
                logged: false,// La autenticacion paso
            })
            return false
        }

        // BASICAMENTE se returna un true o un false
    }, [])

    const logout = () => {

        localStorage.removeItem('token') // ELIMINAMOS del localStorage
        
        dispatch({
            type: types.cerrarSesion
        })
        
        setAuth({
            checking: false, // SI el usuario esta autenticado o no
            logged: false,// si el usuario esta logeado
        })

    }

    const prueba = async (uid1, uid2)=>{
        console.log(uid1, uid2)
    //     const resp = await fetchSinToken('contador/contadorDE',{uid2,uid1})
    //    console.log(resp)
    }

    return (
        <AuthContext.Provider value={{ login, register, verificaToken, logout, auth, prueba }}>
            {children}
        </AuthContext.Provider>
    )
}