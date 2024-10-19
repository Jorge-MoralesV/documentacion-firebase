import React, { useState, useEffect } from "react";
import firebaseApp from "../credenciales";
import { getAuth } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
import AgregarDoc from "../components/AgregarDoc";
import ListarDoc from "../components/ListarDoc";
import { Alert } from "../components/Alert";
import Bar from "../components/Bar";
import './Home.css';

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const [error, setError] = useState();

    const [arrayTareas, setArrayTareas] = useState([]);

    const fakeData = [
        { id: 1, descripcion: "Ejemplo", url: "https://picsum.photos/420" },
    ];

    return (
        <>
            <Bar showLogout={true} />
            <Container className="contenedor-home">

                <div className='encabezado'>
                    {error && <Alert message={error}></Alert>}

                    <div
                        className='m-4'>
                        <h1
                            className='text-center text-light h3'>
                            Hola: {correoUsuario}
                        </h1>
                    </div>

                    <div className=''>
                        <AgregarDoc
                            arrayTareas={arrayTareas}
                            setArrayTareas={setArrayTareas}
                            correoUsuario={correoUsuario}
                        />
                    </div>

                </div>

                <div className="contenedor-lista">
                    {arrayTareas ? (
                        <ListarDoc
                            arrayTareas={arrayTareas}
                            setArrayTareas={setArrayTareas}
                            correoUsuario={correoUsuario}
                        />
                    ) : (
                        <div>
                            <h2>No hay tareas para mostrar</h2>
                        </div>
                    )}
                </div>

            </Container>
        </>
    );
};

export default Home;