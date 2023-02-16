import { get } from '~/utils/httpRequest';

const getDetailPlaylist = async (id) => {
    try {
        const res = await get(`/playlist/${id}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getDetailPlaylist;
