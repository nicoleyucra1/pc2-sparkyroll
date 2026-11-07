import axios from 'axios';

export const BACKEND_URL = 'http://localhost:8080';

export const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: 10000,
    headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
});


api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);

export function getErrorMessage(error: unknown): string {
    if (!axios.isAxiosError(error)) return 'Ocurrio un error inesperado';
    if (error.code === 'ECONNABORTED') return 'La solicitud ha tardado demasiado tiempo en completarse';
    if (!error.response) return 'No se pudo conectar con el servidor';
    const data = error.response.data as {message?: string; error?: string};
    const backendMsg = data?.message ?? data?.error;
    switch (error.response.status) {
        case 400: return backendMsg ?? 'Datos invalidos, revisa el formulario';
        case 401: return 'Tu sesion expiro, vuelve a iniciar sesion';
        case 403: return 'No tienes permiso o tu sesion expiro';
        case 404: return backendMsg ?? 'El recurso no existe';
        case 409: return backendMsg ?? 'Ya existe un usuario con ese email o username';
        case 500: return 'Ocurrio un error en el servidor, intenta mas tarde';
        default: return backendMsg ?? `Error ${error.response.status}`;
    }
}