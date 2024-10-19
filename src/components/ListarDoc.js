import React from "react";
import { Stack, Row, Col } from "react-bootstrap";
import ArticleIcon from '@mui/icons-material/Article';
import firebaseApp from "../credenciales";
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const firestore = getFirestore(firebaseApp);

const ListarDoc = ({ arrayTareas, correoUsuario, setArrayTareas }) => {

  async function eliminarTarea(idTareaAEliminar) {
    const newArrayTareas = arrayTareas.filter((objetoTarea) => objetoTarea.id !== idTareaAEliminar);
    setArrayTareas(newArrayTareas);
  }

  return (

    <Stack>
      {arrayTareas.map((objetoTarea) => {
        return (
          <div className="card card-body mb-2 bg-light">

            <Row>

              <Col>
                <div>
                  <Typography className='text-left' variant="h6" sx={{ flexGrow: 1 }}>
                    {objetoTarea.nombre}
                  </Typography>
                </div>
              </Col>

              <Col></Col>
              <Col></Col>

              <Col>
                <div className="text-center">
                  <IconButton href={objetoTarea.url} target="_blank">
                    <ArticleIcon fontSize='large' color='success' ></ArticleIcon>
                  </IconButton>
                  <IconButton onClick={() => eliminarTarea(objetoTarea.id)}>
                    <RemoveCircleOutlineIcon fontSize='large' color='error' ></RemoveCircleOutlineIcon>
                  </IconButton>
                </div>
              </Col>

            </Row>

          </div>
        );
      })}
    </Stack>
  );
};

export default ListarDoc;
