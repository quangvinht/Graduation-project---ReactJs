import { get } from '~/utils/httpRequest';

const getDetailCategory = async (id) => {
    try {
        const res = await get(`/category/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getDetailCategory;
