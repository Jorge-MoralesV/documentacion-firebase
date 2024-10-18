import React, { useState, useEffect, useCallback } from "react";
import { firestore } from "../credenciales";
import { doc, getDoc } from "firebase/firestore";
import { Container } from "react-bootstrap";
import AgregarDoc from "../components/AgregarDoc";
import ListarDoc from "../components/ListarDoc";
import { Alert } from "../components/Alert";
import Bar from "../components/Bar";
import './Home.css';
import { useAuth } from "../context/AuthContext";

const Home = () => {

    const { user } = useAuth();
    const [error, setError] = useState(null);
    const [arrayTareas, setArrayTareas] = useState([]);

    const fetchDocumentos = useCallback(async () => {
        if (user && user.email) {
            const docuRef = doc(firestore, `documentos/${user.email}`);
            try {
                const consulta = await getDoc(docuRef);
                if (consulta.exists()) {
                    const data = consulta.data();
                    setArrayTareas(data.tareas || []);
                } else {
                    setError('Documento no encontrado');
                }
            } catch (error) {
                setError('Error al obtener los datos de Firestore: ' + error.message);
            }
        } else {
            setError('Usuario no autenticado');
        }
    })

    useEffect(() => {
        fetchDocumentos();
    }, [fetchDocumentos]);

    return (
        <>
            <Bar showLogout={true} />
            <Container className="contenedor-home">
                <div className='encabezado'>
                    {error && <Alert message={error}></Alert>}
                    <div className='m-4'>
                        <h1 className='text-center text-light h3'>
                            Hola: {user.email}
                        </h1>
                    </div>
                    <div className=''>
                        <AgregarDoc
                            arrayTareas={arrayTareas}
                            setArrayTareas={setArrayTareas}
                            correoUsuario={user.email}
                        />
                    </div>
                </div>
                <div className="contenedor-lista">
                    {arrayTareas.length > 0 ? (
                        <ListarDoc
                            arrayTareas={arrayTareas}
                            setArrayTareas={setArrayTareas}
                            correoUsuario={user.email}
                        />
                    ) : (
                        <div className="text-center mt-2 text-white">
                            <h2>No hay tareas para mostrar</h2>
                        </div>
                    )}
                </div>
            </Container>
        </>
    );
};

export default Home;