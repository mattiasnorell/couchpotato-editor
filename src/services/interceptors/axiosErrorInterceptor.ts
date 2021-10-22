import axios from 'axios';

axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            console.log(':(', response);
        }

        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);
