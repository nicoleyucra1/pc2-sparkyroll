import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerRequest } from '../services';
import { getErrorMessage } from '../api';
import type { RegisterRequest } from '../types';
import ErrorMessage from '../components/ErrorMessage';

const fields = [
  { name: 'name', label: 'Nombre', type: 'text'},
  { name: 'email', label: 'Email', type: 'email'},
  { name: 'password', label: 'Contraseña', type: 'password'},
];

export default function RegisterPage(){
  const [form, setForm] = useState<RegisterRequest>({
    name: '', email: '', password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({...form, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await registerRequest(form);
      navigate('/login');
    } catch (err) {
      setError (getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow w-full max-w-sm flex flex-col gap-4">
        <h1 className="text-2xl font-bold text-center">Crear cuenta</h1>
        <ErrorMessage message={error}/>
        {fields.map ((f) => (
          <input key = {f.name} name={f.name} type={f.type} placeholder={f.label} required
          value = {form[f.name as keyof RegisterRequest]}
          onChange = {handleChange}
          className="border rounded-lg p-2"
          />
        ))} 
        <button type="submit" disabled={loading} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50">
          {loading ? 'Registrando...':'Registrarme'}
        </button> 
        <p className="text-sm text-center">
          ¿Ya tienes cuenta? <Link to="/login" className="text-blue-600 underline">
          Inicia sesión</Link>
        </p>
      </form>
    </div>
  )
}