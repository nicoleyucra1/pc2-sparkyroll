import { useEffect, useState } from 'react';
import { getAnimeList, deleteHistory } from '../services';
import { getErrorMessage } from '../api';
import type { Anime, AnimeStatus } from '../types';
import ErrorMessage from '../components/ErrorMessage';

export default function HistoryPage(){
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

    const handleDeleteHistory = async(id:number, status: AnimeStatus) => {    
        try {
          await deleteHistory({animeId: id});  
          const ids: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
          const nuevos = ids.filter((x) => x !== id);
          localStorage.setItem('favorites',JSON.stringify(nuevos));
          if (status == 'viendo'){
            setViendo(viendo.filter((a) => a.id !== id));
          } else {  
            setVisto(visto.filter((a) => a.id !== id));
          } 
        } catch (err) {
          setError(getErrorMessage(err));
        }
      };

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
            <button onClick={() => handleDeleteHistory(a.id, 'viendo')}
            className="flex-1 bg-red-600 hover:bg-red-800 text-white rounded-lg py-1">
                Eliminar del historial
            </button>
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
            <button onClick={() => handleDeleteHistory(a.id, 'visto')}
            className="flex-1 bg-red-600 hover:bg-red-800 text-white rounded-lg py-1">
                Eliminar del historial
            </button>
            <div className="flex gap-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
}