import React, { useState } from "react";
import { Form } from "react-bootstrap";
import BackupIcon from '@mui/icons-material/Backup';
import { firestore, storage } from "../credenciales";
import { doc, setDoc } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { useEffect } from "react";
import { Alert } from "./Alert";

const AgregarDoc = ({ correoUsuario, setArrayTareas, arrayTareas }) => {

  const [nombreArchivo, setNombreArchivo] = useState('');
  const [urlDescarga, setUrlDescarga] = useState('');
  const [botonEstado, setBotonEstado] = useState(true);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);

  useEffect(() => {
    setBotonEstado(!(nombreArchivo && urlDescarga));
  }, [nombreArchivo, urlDescarga]);

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
    } catch (error) {
      setError('Error al actualizar Firestore:', error);
    }

    setNombreArchivo('');
    setUrlDescarga('');
    setProgress(0);
  }

  async function fileHandler(e) {
    const archivoLocal = e.target.files[0];
    const archivoRef = ref(storage, `archivos/${archivoLocal.name}`);
    const uploadTask = uploadBytesResumable(archivoRef, archivoLocal);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      }, (error) => {
        setError('Error al cargar archivo a Firebase Storage:', error);
      }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUrlDescarga(url);
        });
      }
    );
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

        <div className="progress p-0">
          <div
            className="progress-bar progress-bar-striped bg-primary progress-bar-animated"
            role="progressbar"
            style={{ width: `${progress}%` }}
            aria-valuenow={progress}
            aria-valuemin="0"
            aria-valuemax="100"
          >
            {Math.round(progress)}%
          </div>
        </div>

        <div className="col-auto m-auto pt-4">
          <button className="btn btn-dark" disabled={botonEstado}>
            Subir
            <BackupIcon className="ms-2" fontSize='small' color='light'></BackupIcon>
          </button>
        </div>

        {error && <Alert message={error}></Alert>}

      </div>
    </form>
  );
};

export default AgregarDoc;