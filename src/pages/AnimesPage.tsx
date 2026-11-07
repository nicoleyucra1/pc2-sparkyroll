import { useEffect, useState } from 'react';
import { getAnimeList, addFavorites, addHistory } from '../services';
import { getErrorMessage } from '../api';
import type { Anime, AnimeStatus } from '../types';
import AnimeCard from '../components/AnimeCard';
import ErrorMessage from '../components/ErrorMessage';


export default function AnimesPage(){
  const [animes, setAnimes] = useState<Anime[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const load = async() => {
      setLoading(true);
      setError('');
      try {
        const data = await getAnimeList();
        setAnimes(data);
      } catch (err) {
        setError(getErrorMessage(err));
      } finally {
        setLoading(false);
      }
    }; 
    load();
  }, []);

  const handleFavorites = async(id:number) => {    
    try {
      await addFavorites({animeId: id});
      const ids: number[] = JSON.parse(localStorage.getItem('favorites') || '[]'); 
      if (!ids.includes(id)) {
        const nuevos = [...ids, id];
        localStorage.setItem('favorites', JSON.stringify(nuevos) )
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  const handleStatus = async(id:number, status: AnimeStatus) => {    
    try {
      await addHistory({animeId: id, status: status});   
    } catch (err) {
      setError(getErrorMessage(err));
    }
  }

  if (loading) return <p>Cargando...</p>

  return (
  <div>
    <h1>Animes</h1>
    <ErrorMessage message={error} />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {animes.map((a) => (
        <AnimeCard key={a.id} anime={a} onFavorite={handleFavorites} onStatus={handleStatus} />
      ))}
    </div>
  </div>
);
};