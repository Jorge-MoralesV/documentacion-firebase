import React from "react";
import { Form, Col } from "react-bootstrap";
import BackupIcon from '@mui/icons-material/Backup';
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { IconButton } from "@mui/material";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

const AgregarDoc = ({ correoUsuario, setArrayTareas, arrayTareas }) => {
  let urlDescarga;

  async function añadirTarea(e) {
    e.preventDefault();
    const descripcion = e.target.formDescripcion.value;
    // crear nuevo array de tareas
    const nvoArrayTareas = [
      ...arrayTareas,
      {
        id: +new Date(),
        descripcion: descripcion,
        url: urlDescarga,
      },
    ];
    // actualizar base de datos
    const docuRef = doc(firestore, `documentos/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //actualizar estado
    setArrayTareas(nvoArrayTareas);
    // limpiar form
    e.target.formDescripcion.value = "";
  }

  async function fileHandler(e) {
    // detectar archivo
    const archivoLocal = e.target.files[0];
    // cargarlo a firebase storage
    const archivoRef = ref(storage, `archivos/${archivoLocal.name}`);
    await uploadBytes(archivoRef, archivoLocal);
    // obtener url de descarga
    urlDescarga = await getDownloadURL(archivoRef);
  }

  return (
    <form onSubmit={añadirTarea}>

      <div className="p-3 row g-3">

        <div className="col-auto">
          <Form.Control
            className=""
            type="text"
            placeholder="Nombre del documento"
            id="formDescripcion"
          />
        </div>

        <div className="col-auto">
          <Form.Control
            className=""
            type="file"
            onChange={fileHandler}
          />
        </div>

        <div className="col-auto">
          <Col>
            <IconButton type="submit">
              <BackupIcon fontSize='large' color='primary' ></BackupIcon>
            </IconButton>
          </Col>
        </div>

      </div>

      <hr />
    </form>
  );
};

export default AgregarDoc;
