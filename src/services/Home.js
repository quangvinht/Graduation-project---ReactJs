import { get } from '~/utils/httpRequest';

const getHome = async () => {
    try {
        const res = await get(`/home`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getHome;
