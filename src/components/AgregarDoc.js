import React, { useState } from "react";
import { Form } from "react-bootstrap";
import BackupIcon from '@mui/icons-material/Backup';
import { firestore, storage } from "../credenciales";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const AgregarDoc = ({ correoUsuario, setArrayTareas, arrayTareas }) => {

  const [nombreArchivo, setNombreArchivo] = useState('');
  const [urlDescarga, setUrlDescarga] = useState('');

  async function addTask(e) {
    e.preventDefault();

    const newArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        nombre: nombreArchivo,
        url: urlDescarga,
      },
    ];

    const docuRef = doc(firestore, `documentos/${correoUsuario}`);
    try {
      await setDoc(docuRef, { tareas: newArrayTareas }, { merge: true });
      setArrayTareas(newArrayTareas);
      console.log('Documento actualizado en Firestore:', newArrayTareas);
    } catch (error) {
      console.error('Error al actualizar Firestore:', error);
    }
    setNombreArchivo('');
    setUrlDescarga('');
  }

  async function fileHandler(e) {
    const archivoLocal = e.target.files[0];
    const archivoRef = ref(storage, `archivos/${archivoLocal.name}`);
    try {
      await uploadBytes(archivoRef, archivoLocal);
      const url = await getDownloadURL(archivoRef);
      setUrlDescarga(url);
      console.log('Archivo cargado y URL obtenida:', url);
    } catch (error) {
      console.error('Error al cargar archivo a Firebase Storage:', error);
    }
  }

  return (
    <form onSubmit={addTask} className="form">
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
            <BackupIcon className="ms-2" fontSize='small' color='light'></BackupIcon>
          </button>
        </div>

      </div>
    </form>
  );
};

export default AgregarDoc;


/* rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
} */