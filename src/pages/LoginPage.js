import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { AuthContext } from '../auth/AuthContext'

export const LoginPage = () => {

    const { login } = useContext(AuthContext)


    // UseState
    const [form, setForm] = useState({
        email: '',
        password: '',
        rememberme: false
    })

    // console.log(form)

    useEffect(() => {
        const remembermeEmail = localStorage.getItem('email') // Obtener el email existente

        if (remembermeEmail) {
            // Dato importante
            setForm((form) => ({
                ...form,
                rememberme: true,
                email: remembermeEmail
            }))
        }
    }, [])


    // Rellena los valores de los inputs
    const onChange = ({ target }) => {
        // Desestructurar del target
        const { name, value } = target

        setForm({
            ...form,
            // Toma los valores del name para renombrar los valores
            [name]: value
        })
    }

    // Rellena los valores de lo checkbox  
    const toggleCheck = () => {
        setForm({
            ...form,
            rememberme: !form.rememberme
        })
    }

    // ALmacena los campos que ingresaste
    const onSubmit = async (ev) => {
        ev.preventDefault();

        if (form.rememberme) {  // SI esta en true
            localStorage.setItem('email', form.email)
        } else {
            localStorage.removeItem('email')
        }

        // console.log(email, password)

        // TODO: llamar el backend
        const { email, password } = form
        const ok = await login(email, password)
        console.log(ok)

        // "Enviando alerta" de correo y contraseña
        if (!ok) {
            Swal.fire('Error', 'Verifique el usuario y contraseña', 'error')
        }

    }

    // HABILITAR Y DESABILITAR BUTTON
    const todoOk = () => {
        return (form.email && form.password.length > 0) ? true : false
    }

    return (
        <form
            className="login100-form validate-form flex-sb flex-w"
            onSubmit={onSubmit}
        >
            <span className="login100-form-title mb-3">
                Chat - Ingreso
            </span>

            <div className="wrap-input100 validate-input mb-3">
                <input
                    className="input100"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
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
                    value={form.password}
                    onChange={onChange}
                />
                <span className="focus-input100"></span>
            </div>

            <div className="row mb-3">
                <div
                    className="col"
                    onClick={() => toggleCheck()}
                >
                    <input
                        className="input-checkbox100"
                        id="ckb1"
                        type="checkbox"
                        name="rememberme"
                        checked={form.rememberme}
                        readOnly
                    />
                    <label className="label-checkbox100">
                        Recordarme
                    </label>
                </div>

                <div className="col text-right">
                    <Link to="/auth/register" className="txt1">
                        Nueva cuenta?
                    </Link>
                </div>
            </div>

            <div className="container-login100-form-btn m-t-17">
                {/* FORMA DE HABILITAR Y DESABILITAR BUTTON */}
                <button
                    type="submit"
                    className="login100-form-btn"
                    disabled={!todoOk()}
                >
                    Ingresar
                </button>
            </div>

        </form>
    )
}


