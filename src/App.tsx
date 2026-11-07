import {Route, Routes, Navigate} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HistoryPage from './pages/HistoryPage';
import FavoritesPage from './pages/FavoritesPage';
import AnimesPage from './pages/AnimesPage';
import ProtectedRoute from './components/ProtectedRoute';

export default function App(){
  return (
    <Routes>
        <Route path ="/login" element={<LoginPage/>} />
        <Route path = "/register" element={<RegisterPage/>}/>
        <Route element={<ProtectedRoute />}>
          <Route path = "/history" element={<HistoryPage/>}/>
          <Route path = "/favorites" element={<FavoritesPage/>}/>
          <Route path = "/animes" element={<AnimesPage/>}/>
        </Route>
        <Route path="*" element={<Navigate to ="/login"/>}/>
    </Routes>
  )
}
