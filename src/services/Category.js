import { get } from '~/utils/httpRequest';

const getCategory = async () => {
    try {
        const res = await get(`/category/`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getCategory;
