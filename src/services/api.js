import axios from 'axios';
import { credentials } from '../global/credentials';
import { lang } from '../global/lang'


export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export const apiConfig = {
    imgBaseURL: "https://image.tmdb.org/t/p/w500",
}

export const apiFunctions = {
    getMovie: async (movieId) => {

        const url = `/movie/${movieId}?api_key=62029fdd0e8fc17deba6ddf63e551541&language=pt-br`;

        try {

            return await api.get(url);
        } catch (err) {
            return null;
        }
    },
    getMovieByName: async (movieName) => {
        const url = `/search/movie?api_key=62029fdd0e8fc17deba6ddf63e551541&language=pt-br&query=${movieName}&page=1&include_adult=false`;
        try {

            return await (api.get(url));
        } catch (err) {
            return null;
        }
    },
    getPopular: async () => {

        const url = `/movie/popular?api_key=${credentials.API_KEY}&language=pt-br&page=1`;

        try {

            return await (api.get(url));
        } catch (err) {
            return null;
        }
    },
}

