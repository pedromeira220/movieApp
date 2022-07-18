import axios from 'axios';

export const myApi = axios.create({
    baseURL: 'http://10.0.0.50:3333'
})

export const myApiFunctions = {
    login: async function ({ password, email }) {

        let response;

        try {
            response = await myApi.post("/user/login",
                {
                    user: {
                        email,
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
}