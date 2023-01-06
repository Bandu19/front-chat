import { types } from "../../types/types"

export const chatReducer = (state, action) => {
    // console.log(state)
    // console.log(action)
    // console.log(action.type)
    // console.log(action.payload)

    // const initialState = {
    //     uid: '',
    //     chatActivo: null, // UID del usaurio al que yo quiero enviar mensajes
    //     usuarios: [], // Todos los usuarios de la base de datos
    //     mensajes: [] // El chat seleccionado
    //     notificaciones: null

    // }
    switch (action.type) {

        case types.cerrarSesion:
            return {
                uid: '',
                chatActivo: null,
                usuarios: [],
                mensajes: [],
                notificaciones: null
            }    

        // Primer Evento|
        case types.usuariosCargados:
            return {
                // Es la copia de tu initialState
                ...state,
                // En el action.payload vienen los Nuevos usuarios
                usuarios: [...action.payload]
            }

        // Segundo Evento|
        case types.activarChat:

            if (state.chatActivo === action.payload) return state

            return {
                ...state,
                chatActivo: action.payload,
                mensajes: []
                //    notificaciones: 0
            }

        case types.nuevoMensaje:
            // console.log(action.payload)
            if (state.chatActivo === action.payload.de ||
                state.chatActivo === action.payload.para
            ) {
                return {
                    ...state,
                    mensajes: [...state.mensajes, action.payload]
                }
            } else {
                return state
            }
        
        case types.cargarMensajes:    
            return{
                ...state,
                mensajes: [...action.payload]
            }

        case types.nuevaNotificacion:
            console.log(state)
            
            // TRUE =========== SI EXISTE EL ID diego
         
            if (state.chatActivo === action.payload?.mensajePersonal.para ||
                state.chatActivo === action.payload?.mensajePersonal.de
                ) {
                console.log('entro')
                return {
                    ...state,
                    notificaciones: action.payload.contador
                }
            } else {
                return state
            }

        default:
            return state
    }
}