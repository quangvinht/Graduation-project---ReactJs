import { get } from '~/utils/httpRequest';

const getAlbum = async (id) => {
    try {
        const res = await get(`/album/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getAlbum;
