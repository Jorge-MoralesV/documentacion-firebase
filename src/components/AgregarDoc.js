import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import BackupIcon from '@mui/icons-material/Backup';
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { equalTo } from "firebase/database";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarDoc = ({ correoUsuario, setArrayTareas, arrayTareas }) => {

  const [nombreArchivo, setNombreArchivo] = useState('');
  const [urlDescarga, setUrlDescarga] = useState('');

  async function añadirTarea(e) {
    e.preventDefault();

    const newArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        nombre: nombreArchivo,
        url: urlDescarga,
      },
    ];
    setArrayTareas(newArrayTareas);

    setNombreArchivo('');
    setUrlDescarga('');
  }

  async function fileHandler(e) {
    const archivoLocal = e.target.files[0];
    const url = URL.createObjectURL(archivoLocal);
    setUrlDescarga(url);
  }

  return (
    <form onSubmit={añadirTarea} className="form">

      <div className="p-2 row g-3">

        <div className="col-auto w-100">
          <Form.Control
            className="form-control"
            type="text"
            placeholder="Nombre del documento"
            id="formNombre"
            value={nombreArchivo}
            onChange={(e) => setNombreArchivo(e.target.value)}
          />
        </div>

        <div className="col-auto w-100">
          <Form.Control
            className="form-control"
            type="file"
            id="formArchivo"
            onChange={fileHandler}
          />
        </div>

        <div className="col-auto m-auto pt-4">
          <button className="btn btn-dark">
            Subir
            <BackupIcon className="ms-2" fontSize='small' color='light' ></BackupIcon>
          </button>
        </div>

      </div>

    </form>
  );
};

export default AgregarDoc;
