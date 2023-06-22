import { get } from '~/utils/httpRequest';
import httpRequest from '~/utils/httpRequest';

import axios from 'axios';
const login = (email, password) => {
    return axios
        .post('${process.env.REACT_APP_BASE_URL_API}auth/login', { email, password })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem('user', JSON.stringify(response.data));
            }

            return response.data;
        })
        .catch((error) => {
            console.log(error);
        });
};

const logout = () => {
    localStorage.removeItem('user');
};

export default {
    login,
    logout,
};
