import React, { useState } from 'react'
import firebaseApp from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { AppBar, Container, Toolbar, Typography } from '@mui/material'
import logotec from '../assets/img/logotec.svg'
import { Alert } from './Alert'

const auth = getAuth(firebaseApp)

const Logueo = () => {

    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState()

    const [estadoRegistrando, setEstadoRegistrando] = useState(false)

    const handleChange = ({ target: { name, value } }) => {
        setUser({ ...user, [name]: value })
    }

    async function submitHandler(e) {
        e.preventDefault();
        const correo = e.target.id_correo.value
        const contra = e.target.id_password.value
        try {
            if (estadoRegistrando) {
                const usuario = await createUserWithEmailAndPassword(auth, correo, contra)
            } else {
                signInWithEmailAndPassword(auth, correo, contra)
            }
        } catch (error) {
            if (error.code === "auth/weak-password") {
                setError('La contraseña debe ser mínimo de 6 caracteres.')
            } else if (error.code === "auth/invalid-email") {
                setError('Correo invalido.')
            } else if (error.code === "auth/user-not-found") {
                setError('Usuarui no encontrado.')
            } else {
                setError('Error desconocido.')
            }
        }
    }

    const resetPassword = (email) => sendPasswordResetEmail(auth, email)

    const handleResetPassword = async (e) => {
        if (!user.email) return setError('Please enter your email')
        try {
            await resetPassword(user.email)
            setError('We sent you an email with a link to reset your password')
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <Container>

            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className='card p-5 bg-light container mt-5'>

                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <img src={logotec} className='img-fluid ml-5 mr-2'></img>
                        <Typography className='text-center' variant="h6" sx={{ flexGrow: 1 }}>
                        </Typography>
                    </Toolbar>
                </AppBar>

                <h1 className='text-center mb-5'>{estadoRegistrando ? "Regístrate" : "Inicia sesión"}</h1>

                {error && <Alert message={error}></Alert>}

                <form onSubmit={submitHandler} className='card card-body p-4 mb-3'>
                    <div className='mb-3'>
                        <label>Correo electronico:</label>
                        <input onChange={handleChange} type='text' id='id_correo' name='email' className='form-control'></input>
                    </div>
                    <div className='mb-3'>
                        <label>Contraseña:</label>
                        <input onChange={handleChange} type='password' id='id_password' name='password' className='form-control'></input>
                    </div>

                    <div >
                        <button
                            type='submit'
                            className='btn btn-primary text-left'>
                            {estadoRegistrando ? "Regístrate" : "Inicia sesión"}
                        </button>

                        <a
                            onClick={handleResetPassword}
                            className='m-5 text-right'>
                            {estadoRegistrando ? "" : "Olvide mi contraseña"}
                        </a>
                    </div>

                </form>

                <p
                    className='text-primary text-center'
                    type='button'
                    onClick={() => setEstadoRegistrando(!estadoRegistrando)}>
                    {estadoRegistrando ? "¿Ye tienes una cuenta? Inicia sesión" : "¿No tienes una cuenta? Registrate"}
                </p>

            </div>
        </Container>

    )
}

export default Logueo