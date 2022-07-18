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
        return baseFunctionPOST("/user/register", {
            user: {
                email, name, password,
            }
        })
    },
    getUserData: async function ({ userId }) {
        let response;

        try {
            response = await myApi.get(`/user/${userId}`);

            const responseToReturn = response.data;
            responseToReturn.status = response.status;

            return responseToReturn;
        } catch (error) {

            const { status, data } = error.response;


            return { status: status, msg: data.msg, error: data.error }
        }
    },

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