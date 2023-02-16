import { get } from '~/utils/httpRequest';

const getSearch = async (keyword) => {
    try {
        const res = await get(`/search?keyword=${keyword}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getSearch;
