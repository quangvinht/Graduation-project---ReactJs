import axios from 'axios';

const userService = {
    getID: async () => {
        await axios
            .get('http://localhost:8080/profile', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
                },
            })
            .then((response) => {
                return response.data.sub;
            })
            .catch((error) => {
                console.error(error);
            });
    },
    getUserInformations: (id) => {
        axios({
            method: 'get',
            url: `http://localhost:8080/user/${id}`,
        }).then(function (response) {
            return response.data;
        });
    },
};

export default userService;
