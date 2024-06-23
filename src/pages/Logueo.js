import React, { useState } from 'react'
import firebaseApp from '../credenciales'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth'
import { Alert } from '../components/Alert'
import Bar from '../components/Bar'
import './Logueo.css'

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
        const correo = e.target.id_correo.value
        const contra = e.target.id_password.value
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
        if (!user.email) return setError('Please enter your email')
        try {
            await resetPassword(user.email)
            setError('We sent you an email with a link to reset your password')
        } catch (error) {
            setError(error.message)
        }
    }


    return (
        <>
            <Bar></Bar>

            <div className='container'>
                <h2 className='text-center text-light mt-2 mb-4 w-100'>{estadoRegistrando ? "Regístrate" : "Inicia sesión"}</h2>

                {error && <Alert message={error}></Alert>}

                <form onSubmit={submitHandler} className='form'>
                    <div class="mb-3">
                        <label for="" class="form-label">Correo electronico:</label>
                        <input
                            onChange={handleChange}
                            type="email"
                            class="form-control mb-2"
                            name="email"
                            id="id_correo"
                            aria-describedby="helpId"
                            placeholder="Jhon Doe"
                        />
                        <label for="" class="form-label">Contraseña:</label>
                        <input
                            onChange={handleChange}
                            type="password"
                            class="form-control"
                            name="password"
                            id="id_password"
                            aria-describedby="helpId"
                            placeholder="jhon@email.com"
                        />
                    </div>

                    <div className='d-flex justify-content-center'>
                        <button
                            type='submit'
                            className='btn btn-primary me-2'>
                            {estadoRegistrando ? "Regístrate" : "Inicia sesión"}
                        </button>

                        <button
                            onClick={handleResetPassword}
                            className={`btn btn-dark text-light ml-2 ${estadoRegistrando ? 'd-none' : ''}`}
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
            </div>
        </>
    )
}

export default Logueo