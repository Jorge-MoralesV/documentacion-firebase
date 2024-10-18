import { useAuth } from "../context/AuthContext";
import { Navigate } from 'react-router-dom'

export function ProtectedRoute({ children }) {
    
    const { user, loading } = useAuth();

    if (loading) return <div className="text-center m-auto">
        <h1 className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded">Cargando...</h1>
    </div>

    if (!user) return <Navigate to='/login'></Navigate>

    return <>{children}</>

}