import React from "react";
import Home from "./pages/Home";
import Logueo from "./pages/Logueo";
import theme from './temaConfig'
import { ThemeProvider } from "@mui/system";
import { AuthProvider } from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";

function App() {

  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes>

          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />

          <Route path='/login' element={<Logueo />} />

        </Routes>
      </AuthProvider>
    </ThemeProvider >
  );
}

export default App;
