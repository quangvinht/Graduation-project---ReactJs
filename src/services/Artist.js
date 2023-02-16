import { get } from '~/utils/httpRequest';

const getArtist = async (artistName) => {
    try {
        const res = await get(`/artist/${artistName}`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getArtist;
