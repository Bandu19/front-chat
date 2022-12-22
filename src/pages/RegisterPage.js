import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'

export const RegisterPage = () => {

    // UseContext
    const { register } = useContext(AuthContext)

    // UseState
    const [registro, setRegistro] = useState({
        nombre: '',
        email: '',
        password: ''
    })
    // Rellena los valores de los inputs
    const onChange = ({ target }) => {
        const { name, value } = target
        setRegistro({
            ...registro,
            [name]: value
        })
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        // console.log(registro)

        // TODO: llamar el backend
        const { nombre, email, password } = registro
        const lsm = await register(nombre, email, password)
        console.log(lsm)

        // // "Enviando alerta" de correo y contraseña

        // Esta sirve cuando escribes mal el correo
        if (lsm.errors?.email?.msg) {
            Swal.fire('Error', lsm.errors.email.msg, 'error')
        }
        // Sirve cuando el correo ya existe 
        else if (lsm.msg !== false && lsm !== true) {
            Swal.fire('Error', lsm.msg, 'error')
        }
        // Sirve cuando creas un nuevo correo
        else if (lsm !== false) {
            Swal.fire('En hora buena', 'Cuenta creada exitosamente', 'success')
        }

    }
    // HABILITAR Y DESABILITAR BUTTON
    const todoOk = () => {
        return (registro.nombre && registro.email && registro.password.length > 0) ? true : false
    }

    return (
        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={onSubmit}
        >
            <span className="login100-form-title mb-3">
                Chat - Registro
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="text"
                    name="nombre"
                    placeholder="Nombre"
                    value={registro.nombre}
                    onChange={onChange}

                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={registro.email}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>


            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={registro.password}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div className="col text-right">
                    <Link to="/auth/login" className="txt1">
                        Ya tienes cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                <button
                    className="login100-form-btn"
                    disabled={!todoOk()}
                >
                    Crear cuenta
                </button>
            </div>

        </form>
    )
}

