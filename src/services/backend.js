import axios from 'axios';

export const myApi = axios.create({
    baseURL: 'http://10.0.0.50:3333'
})

export const myApiFunctions = {
    login: async function ({ password, email }) {

        return await baseFunctionPOST({
            url: "/user/login", params: {
                user: {
                    email,
                    password
                }
            }
        });

    },
    register: async function ({ email, name, password, }) {
        let response;

        try {
            response = await myApi.post("/user/register", {
                user: {
                    email,
                    name,
                    password
                }
            });

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {

            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    getUserData: async function ({ userId, token }) {
        let response;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {
            response = await myApi.get(`/user/data/${userId}`, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {

            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    createList: async function ({ listName, listType, userId, token }) {
        let response;


        const url = "/user/create_list";
        const bodyParams = {
            list_name: listName,
            list_type: String(listType),
            user_id: userId
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };


        try {
            response = await myApi.post(url, bodyParams, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {
            console.error("error has been ocurred");
            console.error(error);
            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    getAllLists: async function ({ userId, token }) {
        let response;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        try {



            response = await myApi.get(`/user/list_all_lists/${userId}`, config);



            const responseToReturn = response.data;



            responseToReturn.status = response.status;


            return responseToReturn;
        } catch (error) {

            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    getAllMoviesFromList: async function ({ listId, token }) {
        let response;
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };


        try {
            response = await myApi.get(`/user/get_all_movies_from_list/${listId}`, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {

            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    deleteList: async function ({ listId, ownerId, token }) {
        let response;


        const url = "/user/delete_list";
        const bodyParams = {
            list_id: listId,
            owner_id: ownerId
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            data: bodyParams
        };


        try {
            response = await myApi.delete(url, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {
            console.error("error has been ocurred");
            console.error(error);
            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    addMovieToList: async function ({ listId, TMDBmovieId, token }) {
        let response;


        const url = "/user/add_movie_to_list/";
        const bodyParams = {
            list_id: listId,
            TMDB_id: TMDBmovieId
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };


        try {
            response = await myApi.post(url, bodyParams, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {
            console.error("error has been ocurred");
            console.error(error);
            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    getMovieByListIdAndTMDBid: async function ({ listId, TMDBmovieId, token }) {
        let response;



        const url = `user/get_movie_by_api_id_and_list_id/${TMDBmovieId}/${listId}`;

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };


        try {
            response = await myApi.get(url, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {
            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },
    deleteMovie: async function ({ token, listId, TMDBmovieId }) {
        let response;


        const url = "/user/delete_movie";
        const bodyParams = {
            list_id: listId,
            TMDB_id: TMDBmovieId
        };
        const config = {
            headers: { Authorization: `Bearer ${token}` },
            data: bodyParams,
        };


        try {
            response = await myApi.delete(url, config);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {
            console.error("error has been ocurred");
            console.error(error);
            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    }
}

async function baseFunctionPOST({ url, params }) {
    let response;

    try {
        response = await myApi.post(url, params);

        const responseToReturn = response.data;
        responseToReturn.status = response.status;

        return responseToReturn;
    } catch (error) {

        const { status, data } = error.response;


        return { status: status, msg: data.msg, error: data.error }
    }
}