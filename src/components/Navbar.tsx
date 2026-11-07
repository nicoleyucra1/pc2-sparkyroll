import {Link, useNavigate} from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

//Vistas a implementar
// Registro -- no va
// Login -- no va
// Animes
// Favoritos 
// Historial

export default function Navbar() {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const handleLogout = () => {
        logout();
        navigate('/login');
    };

  return (
    <nav>
        <span>SparkyRoll</span>
        <Link to ="/animes">Animes</Link>
        <Link to ="/favorites">Favoritos</Link>
        <Link to ="/history">Historial</Link>
        <button onClick = {handleLogout}>Cerrar sesión</button>
    </nav>
  );
}