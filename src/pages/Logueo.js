import React, { useState } from 'react'
import { Alert } from '../components/Alert'
import Bar from '../components/Bar'
import './Home.css'
import { Container } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const Logueo = () => {

    const [estadoLogin, setEstadoLogin] = useState(false);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const { login, signUp, resetPassword } = useAuth();
    const [error, setError] = useState();
    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }
    const navigate = useNavigate();

    async function submitHandler(e) {
        e.preventDefault();
        setError('');
        try {
            if (estadoLogin) {
                await signUp(user.email, user.password);
            } else {
                await login(user.email, user.password);
            }
            navigate('/');
        } catch (error) {
            alertas(error);
        }
    }

    const alertas = (error) => {
        const errorMessages = {
            "auth/invalid-email": 'Correo invalido.',
            "auth/missing-password": 'Ingrese una contraseña.',
            "auth/weak-password": 'La contraseña debe ser mínimo de 6 caracteres.',
            "auth/email-already-in-use": 'El usuario ya existe.',
            "auth/user-not-found": 'Usuario no encontrado.',
            "auth/wrong-password": 'La contraseña es incorrecta.'
        };
        const mensaje = errorMessages[error.code] || 'Error desconocido.';
        setError(mensaje);
    }

    const handleResetPassword = async () => {
        if (!user.email) return setError('Por favor, ingresa tu correo.')
        try {
            await resetPassword(user.email)
            setError('Te hemos enviado un correo electrónico con un enlace para restablecer tu contraseña.')
        } catch (error) {
            alertas(error);
        }
    }

    return (
        <>
            <Bar showLogout={false}></Bar>
            <div className='cuerpo'>
                <Container className='contenedor'>
                    <h2 className='text-center text-light mt-2 mb-4 w-100'>{estadoLogin ? "Regístrate" : "Inicia sesión"}</h2>
                    {error && <Alert message={error}></Alert>}
                    <form onSubmit={submitHandler} className='form'>
                        <div className="mb-3">
                            <label for="email" className="form-label">Correo electronico:</label>
                            <input
                                onChange={handleChange}
                                id="email"
                                type="email"
                                name="email"
                                className="form-control mb-2 w-100"
                                aria-describedby="helpId"
                                placeholder="jhon@email.com"
                            />
                            <label for="password" className="form-label">Contraseña:</label>
                            <input
                                onChange={handleChange}
                                id="password"
                                type="password"
                                name="password"
                                className="form-control w-100"
                                aria-describedby="helpId"
                                placeholder="****"
                            />
                        </div>
                        <div className='d-flex justify-content-center w-100'>
                            <button
                                type='submit'
                                className='btn btn-primary'>
                                {estadoLogin ? "Regístrate" : "Inicia sesión"}
                            </button>

                            <button
                                onClick={handleResetPassword}
                                className={`btn btn-dark text-light ms-2 ml-2 ${estadoLogin ? 'd-none' : ''}`}
                            >
                                Olvidé mi contraseña
                            </button>
                        </div>
                    </form>
                    <p
                        className='text-light text-center w-100 mt-4'
                        type='button'
                        onClick={() => setEstadoLogin(!estadoLogin)}>
                        {estadoLogin ? "¿Ye tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Registrate"}
                    </p>
                </Container>
            </div>
        </>
    )
}

export default Logueo;