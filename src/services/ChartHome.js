import { get } from '~/utils/httpRequest';

const getChartHome = async () => {
    try {
        const res = await get(`/chart/home`);

        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export default getChartHome;
