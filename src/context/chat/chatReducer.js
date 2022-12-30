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
    // }
    switch (action.type) {

        case types.usuariosCargados:
            return{
                // Es la copia de tu initialState
                ...state,
                // En el action.payload vienen los Nuevos usuarios
                usuarios: [...action.payload]
            }

        case types.activarChat:
            
            if(state.chatActivo === action.payload) return state
            
            return{
               ...state,
               chatActivo: action.payload,
               mensajes:[]
            }

        default:
            return state
    }
}