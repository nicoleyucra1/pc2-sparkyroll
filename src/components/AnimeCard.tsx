import type { AnimeStatus, Anime } from '../types';

interface Props {
    anime: Anime;
    onFavorite: (id: number) => void;
    onStatus: (id: number, status: AnimeStatus) => void;
}

export default function AnimeCard({anime, onFavorite, onStatus}: Props) {
    return (
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2">
            {anime.imageUrl && 
            ( <img src={anime.imageUrl} alt={anime.title} className="h-40 w-full object-cover rounded-lg" />
        )}
        <h2 className="text-lg font-semibold">{anime.title}</h2>        
        <p className="text-sm text-gray-500">{anime.genre}</p>
        <div className="flex gap-2">
            <button onClick={() => onFavorite(anime.id)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-1">
                Agregar a favoritos
            </button>
            <button onClick={() => onStatus(anime.id, 'viendo')}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-1">
                Viendo
            </button>
            <button onClick={() => onStatus(anime.id, 'visto')}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-1">
                Visto
            </button>
        </div>
        </div>
    );
}