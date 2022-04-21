import React, { useState, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import firebaseApp from "../credenciales";
import { getAuth, signOut } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { Container } from "react-bootstrap";
import AgregarDoc from "./AgregarDoc";
import ListarDoc from "./ListarDoc";
import logotec from '../assets/img/logotec.svg'
import { Alert } from "./Alert";

const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);

const Home = ({ correoUsuario }) => {

    const [error, setError] = useState()

    const [arrayTareas, setArrayTareas] = useState(null);
    const fakeData = [
        { id: 1, descripcion: "Ejemplo", url: "https://picsum.photos/420" },
    ];

    async function buscarDocumentOrCrearDocumento(idDocumento) {
        //crear referencia al documento
        const docuRef = doc(firestore, `documentos/${idDocumento}`);
        // buscar documento
        const consulta = await getDoc(docuRef);
        // revisar si existe
        if (consulta.exists()) {
            // si sí existe
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        } else {
            // si no existe
            await setDoc(docuRef, { tareas: [...fakeData] });
            const consulta = await getDoc(docuRef);
            const infoDocu = consulta.data();
            return infoDocu.tareas;
        }
    }

    useEffect(() => {
        async function fetchTareas() {
            const tareasFetchadas = await buscarDocumentOrCrearDocumento(
                correoUsuario
            );
            setArrayTareas(tareasFetchadas);
        }

        fetchTareas();
    }, []);

    return (

        <Container className="">

            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <br></br>

            <div className='card card-body bg-light f-screen w-full max-w-xl m-auto'>

                <AppBar position="fixed" color="primary">
                    <Toolbar>
                        <img src={logotec} className='img-fluid ml-5 mr-2'></img>
                        <Typography sx={{ flexGrow: 1 }}>
                        </Typography>
                        <IconButton onClick={() => signOut(auth)}>
                            <LogoutIcon fontSize='large' color='secondary'></LogoutIcon>
                        </IconButton>
                    </Toolbar>
                </AppBar>

                {error && <Alert message={error}></Alert>}

                <div
                    className='m-4'>
                    <h1
                        className='text-center h3'>
                        Hola: {correoUsuario}
                    </h1>
                </div>

                <div className='card p-2 mb-4'>
                    <AgregarDoc
                        arrayTareas={arrayTareas}
                        setArrayTareas={setArrayTareas}
                        correoUsuario={correoUsuario}
                    />
                    {arrayTareas ? (
                        <ListarDoc
                            arrayTareas={arrayTareas}
                            setArrayTareas={setArrayTareas}
                            correoUsuario={correoUsuario}
                        />
                    ) : null}
                </div>
            </div>

            <br></br>

        </Container>

    );
};

export default Home;