import { get } from '~/utils/httpRequest';

const getNewRelease = async () => {
    try {
        const res = await get(`/chart/new-release`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getNewRelease;
