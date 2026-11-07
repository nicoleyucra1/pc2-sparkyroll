export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest{
    email: string;
    password: string;
    name: string;
}

export interface AuthResponse{
    token: string;
}

export interface Anime{
    id: number;
    title: string;
    genre: string;
    imageUrl: string;
}

export interface AnimeIdRequest { 
    animeId: number;
}

export type AnimeStatus = 'viendo' | 'visto'

export interface HistoryRequest {
    animeId: number;
    status: AnimeStatus;
}