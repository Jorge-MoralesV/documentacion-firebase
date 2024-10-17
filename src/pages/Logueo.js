import React, { useState } from 'react'
import firebaseApp from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { Alert } from '../components/Alert'
import Bar from '../components/Bar'
import './Logueo.css'
import { Container } from '@mui/material'

const auth = getAuth(firebaseApp);

function Logueo() {

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [error, setError] = useState();

    const [estadoRegistrando, setEstadoRegistrando] = useState(false);

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.email.value
        const contra = e.target.password.value
        try {
            if (estadoRegistrando) {
                await createUserWithEmailAndPassword(auth, correo, contra)
            } else {
                signInWithEmailAndPassword(auth, correo, contra)
            }
        } catch (error) {
            if (error.code === "auth/weak-password") {
                setError('La contraseña debe ser mínimo de 6 caracteres.')
            } else if (error.code === "auth/invalid-email") {
                setError('Correo invalido.')
            } else if (error.code === "auth/user-not-found") {
                setError('Usuario no encontrado.')
            } else {
                setError('Error desconocido.')
            }
        }
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    const handleResetPassword = async () => {
        if (!user.email) return setError('Por favor, ingresa tu correo.')
        try {
            await resetPassword(user.email)
            setError('We sent you an email with a link to reset your password')
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <>
            <Bar showLogout={false}></Bar>

            <div className='cuerpo'>

                <Container className='contenedor'>

                    <h2 className='text-center text-light mt-2 mb-4 w-100'>{estadoRegistrando ? "Regístrate" : "Inicia sesión"}</h2>

                    {error && <Alert message={error}></Alert>}

                    <form onSubmit={submitHandler} className='form'>

                        <div class="mb-3">
                            <label for="email" class="form-label">Correo electronico:</label>
                            <input
                                onChange={handleChange}
                                type="email"
                                className="form-control mb-2 w-100"
                                name="email"
                                id="email"
                                aria-describedby="helpId"
                                placeholder="Jhon Doe"
                            />
                            <label for="password" class="form-label">Contraseña:</label>
                            <input
                                onChange={handleChange}
                                type="password"
                                className="form-control w-100"
                                name="password"
                                id="password"
                                aria-describedby="helpId"
                                placeholder="jhon@email.com"
                            />
                        </div>

                        <div className='d-flex justify-content-center w-100'>
                            <button
                                type='submit'
                                className='btn btn-primary'>
                                {estadoRegistrando ? "Regístrate" : "Inicia sesión"}
                            </button>

                            <button
                                onClick={handleResetPassword}
                                className={`btn btn-dark text-light ms-2 ml-2 ${estadoRegistrando ? 'd-none' : ''}`}
                            >
                                Olvidé mi contraseña
                            </button>
                        </div>

                    </form>
                    <p
                        className='text-light text-center w-100 mt-4'
                        type='button'
                        onClick={() => setEstadoRegistrando(!estadoRegistrando)}>
                        {estadoRegistrando ? "¿Ye tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Registrate"}
                    </p>
                </Container>
            </div>
        </>
    )
}

export default Logueo