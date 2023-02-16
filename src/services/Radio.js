import { get } from '~/utils/httpRequest';

const getRadio = async () => {
    try {
        const res = await get(`/radio`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getRadio;
