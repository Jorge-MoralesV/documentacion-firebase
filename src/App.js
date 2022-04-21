import React, { useState } from "react";
import Home from "./components/Home";
import Logueo from "./components/Logueo";
import theme from './temaConfig'
import firebaseApp from "./credenciales";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { ThemeProvider } from "@mui/system";
const auth = getAuth(firebaseApp);

function App() {
  const [usuarioGlobal, setUsuarioGlobal] = useState(null);

  onAuthStateChanged(auth, (usuarioFirebase) => {
    if (usuarioFirebase) {
      //código en caso de que haya sesión inciiada
      setUsuarioGlobal(usuarioFirebase);
    } else {
      //código en caso de que no haya sesión iniciada
      setUsuarioGlobal(null);
    }
  });

  return (
    <ThemeProvider theme={theme}>
      {usuarioGlobal ? (
        <Home correoUsuario={usuarioGlobal.email} />
      ) : (
        <Logueo />
      )}
    </ThemeProvider >
  );
}

export default App;
