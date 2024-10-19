import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {

    const { user, loading } = useAuth();

    if (loading) return <div className="text-center m-auto w-25 vh-100 align-content-center">
        <h1 className="text-white border rounded p-3">Cargando...</h1>
    </div>

    if (!user) return <Navigate to='/login'></Navigate>

    return <>{children}</>

}