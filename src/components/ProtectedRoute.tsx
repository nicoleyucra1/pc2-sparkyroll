import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';

export default function ProtectedRoute() {
    const { isAuthenticated } = useAuth();
    if (!isAuthenticated) return <Navigate to = "/login" replace />;

    return (
        <>
            <Navbar />
            <main className = "max-w-6xl mx-auto p-6">
                <Outlet/>
            </main>
        </>
    )
}