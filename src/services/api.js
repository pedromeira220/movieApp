import axios from 'axios';
import { credentials } from '../global/credentials';
import { lang, region } from '../global/lang'


export const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3'
})

export const apiConfig = {
    imgBaseURL: "https://image.tmdb.org/t/p/w500",
}

export const apiFunctions = {
    getMovie: async (movieId) => {

        const url = `/movie/${movieId}?api_key=${credentials.API_KEY}&language=${lang}`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getListByMovieName: async (movieName) => {
        const url = `/search/movie?api_key=${credentials.API_KEY}&language=${lang}&query=${movieName}&page=1&include_adult=false&region=${region}`;
        try {

            return await (api.get(url));
        } catch (err) {
            return null;
        }
    },
    getPopular: async (page = 1) => {
        const url = `/movie/popular?api_key=${credentials.API_KEY}&language=${lang}&page=${page}&region=${region}`;

        try {
            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getTopRated: async () => {
        const url = `/movie/top_rated?api_key=${credentials.API_KEY}&language=${lang}&page=1`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getLast: async () => {
        const url = `/movie/latest?api_key=${credentials.API_KEY}&language=${lang}`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getNowPlaying: async () => {
        const url = `/movie/now_playing?api_key=${credentials.API_KEY}&language=${lang}&page=1`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getUpcoming: async () => {
        const url = `/movie/upcoming?api_key=${credentials.API_KEY}&language=${lang}&page=1&region=${region}`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },
    getRecommendations: async (movieId) => {
        const url = `/movie/${movieId}/recommendations?api_key=${credentials.API_KEY}&language=${lang}&page=1`;

        try {

            return (await api.get(url));
        } catch (err) {
            return null;
        }
    },

}

