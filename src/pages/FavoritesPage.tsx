import { useEffect, useState } from 'react';
import { getAnimeList, deleteFavorite } from '../services';
import { getErrorMessage } from '../api';
import type { Anime} from '../types';
import ErrorMessage from '../components/ErrorMessage';

export default function FavoritesPage(){
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

   useEffect(() => {
    const load = async() => {
      setLoading(true);
      setError('');
      try {
        const data = await getAnimeList();
        const ids: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favoritos = data.filter((a) => ids.includes(a.id));
        setAnimes(favoritos);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }; 
    load();
  }, []);

    const handleDeleteFavorite = async(id:number) => {    
    try {
      await deleteFavorite({animeId: id});  
      const ids: number[] = JSON.parse(localStorage.getItem('favorites') || '[]');
      const nuevos = ids.filter((x) => x !== id);
      localStorage.setItem('favorites',JSON.stringify(nuevos));
      setAnimes(animes.filter((a) => a.id !== id));

    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

    if (loading) return <p>Cargando...</p>;

    return (
    <div>
      <h1>Favoritos</h1>
      <ErrorMessage message={error} />
      {animes.length === 0 && <p>Todavia no tienes favoritos</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {animes.map((a) => (
          <div  key={a.id} className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            {a.imageUrl && 
            ( <img src={a.imageUrl} alt={a.title} className="h-40 w-full object-cover rounded-lg" />
        )}
            <h2 className="text-lg font-semibold">{a.title}</h2>        
            <p className="text-sm text-gray-500">{a.genre}</p>
            <div className="flex gap-2">
            <button onClick={() => handleDeleteFavorite(a.id)}
            className="flex-1 bg-red-600 hover:bg-red-600 text-white rounded-lg py-1">
                Eliminar de favoritos
            </button>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
}