import axios from 'axios';

const accessToken = JSON.parse(localStorage.getItem('user'));
const axiosInstance = (path) => {
    axios
        .get('http://localhost:8080' + `${path}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        })
        .then((response) => {
            return response.data;
        })
        .catch((error) => {
            console.error(error);
        });
};

export default axiosInstance;
