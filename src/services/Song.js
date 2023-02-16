import { get } from '~/utils/httpRequest';

const getSong = async (currentSongId) => {
    try {
        const res = await get(`song/${currentSongId}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getSong;
