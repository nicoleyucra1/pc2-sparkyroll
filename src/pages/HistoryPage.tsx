import { useEffect, useState } from 'react';
import { getAnimeList } from '../services';
import { getErrorMessage } from '../api';
import type { Anime} from '../types';
import ErrorMessage from '../components/ErrorMessage';

export default function FavoritesPage(){
  const [viendo, setViendo] = useState<Anime[]>([]);
  const [visto, setVisto] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    const load = async() => {
      setLoading(true);
      setError('');
      try {
        const data = await getAnimeList();
        const idsViendo: number[] = JSON.parse(localStorage.getItem('viendo') || '[]');
        setViendo(data.filter((a) => idsViendo.includes(a.id)));
        const idsVisto: number[] = JSON.parse(localStorage.getItem('visto') || '[]');
        setVisto(data.filter((a) => idsVisto.includes(a.id)))
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }; 
    load();
  }, []);

    if (loading) return <p>Cargando...</p>;

    return (
    <div>
      <h1>Favoritos</h1>
      <ErrorMessage message={error} />
      <h2 className="text-xl font-bold mt-6 mb-3">Viendo</h2>
      {viendo.length === 0 && <p>No estás viendo un anime por el momento</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {viendo.map((a) => (
          <div  key={a.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            {a.imageUrl && ( <img src={a.imageUrl} alt={a.title} className="h-40 w-full object-cover rounded-lg" />)}
            <h2 className="text-lg font-semibold">{a.title}</h2>        
            <p className="text-sm text-gray-500">{a.genre}</p>
            <div className="flex gap-2"></div>
          </div>))}
      </div>
      <h2 className="text-xl font-bold mt-6 mb-3">Visto</h2>
      {visto.length === 0 && <p>Aún no has terminado de ver un anime</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {visto.map((a) => (
          <div  key={a.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            {a.imageUrl && ( <img src={a.imageUrl} alt={a.title} className="h-40 w-full object-cover rounded-lg" />)}
            <h2 className="text-lg font-semibold">{a.title}</h2>        
            <p className="text-sm text-gray-500">{a.genre}</p>
            <div className="flex gap-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}