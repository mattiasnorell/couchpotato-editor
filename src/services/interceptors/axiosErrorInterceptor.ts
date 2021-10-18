import axios from 'axios';

axios.interceptors.response.use(
    (response) => {
        if (response.status !== 200) {
            console.log(':(');
        }

        return response;
    },
    (error) => {
      console.log('dildo')
        return Promise.reject(error);
    }
);
