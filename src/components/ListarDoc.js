import React from "react";
import { Stack } from "react-bootstrap";
import { IconButton, Typography } from "@mui/material";
import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "../credenciales";
import '../pages/Home.css';
import { FileOpenTwoTone, FolderDeleteTwoTone } from "@mui/icons-material";

const ListarDoc = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

  async function eliminarTarea(idTareaAEliminar) {
    // crear nuevo array de tareas
    const nvoArrayTareas = arrayTareas.filter(
      (objetoTarea) => objetoTarea.id !== idTareaAEliminar
    );
    // actualizar base de datos
    const docuRef = doc(firestore, `documentos/${correoUsuario}`);
    updateDoc(docuRef, { tareas: [...nvoArrayTareas] });
    //actualizar state
    setArrayTareas(nvoArrayTareas);
  }

  return (
    <>
      <Stack>
        {arrayTareas.map((objetoTarea) => {
          return (
            <div className="tarjeta text-white">

              <div className="contenedor-nombre-archivo">
                <Typography className='text-left' variant="h6" sx={{ flexGrow: 1 }}>
                  Nombre del archivo: {objetoTarea.nombre}
                </Typography>
              </div>

              <div className="contenedor-botones">
                <IconButton href={objetoTarea.url} target="_blank">
                  <FileOpenTwoTone fontSize='large' color='success' />
                </IconButton>

                <IconButton onClick={() => eliminarTarea(objetoTarea.id)}>
                  <FolderDeleteTwoTone fontSize='large' color='error' />
                </IconButton>
              </div>

            </div>
          );
        })}
      </Stack>
    </>
  );
};

export default ListarDoc;
