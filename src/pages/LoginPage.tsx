import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginRequest } from '../services';
import { getErrorMessage } from '../api';
import { useAuth } from '../context/AuthContext';
import ErrorMessage from '../components/ErrorMessage';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { saveToken } = useAuth();
  const navigate = useNavigate();
  
  const handleSubmit = async (e: FormEvent )=> {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await loginRequest({ email, password});
      saveToken(data.token);
      navigate('/animes');
    } catch (err) {
      setError (getErrorMessage(err));
      } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Iniciar sesión</h1>
        <ErrorMessage message={error} />
        <input 
          type="email" placeholder="Email" required
          value = {email} onChange={(e) => setEmail(e.target.value)}
          className="border rounded-lg p-2"
        />
        <input
          type="password" placeholder="Contraseña" required
          value={password} onChange={(e) => setPassword(e.target.value)}
          className="border rounded-lg p-2" 
        />
        <button type="submit" disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50">
            {loading ? 'Ingresando...':'Ingresar'}
          </button>
          <p className="text-sm text-center">
            ¿No tienes cuenta? <Link to="/register" className="text-blue-600 underline">Regístrate</Link>
          </p>
      </form>
    </div>
  )
}