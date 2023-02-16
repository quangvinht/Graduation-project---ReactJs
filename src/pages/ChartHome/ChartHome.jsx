import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ChartHome.module.scss';
import { useParams, useNavigate } from 'react-router-dom';

import getChartHome from '~/services/ChartHome';
import Loading from '~/components/Loading';
import ChartHomeItem from '~/components/ChartHomeItem';

const cx = classNames.bind(styles);

function ChartHome() {
    const { region } = useParams();

    const navigation = useNavigate();

    const [data, setData] = useState([]);
    const [songs, setSongs] = useState([]);

    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getApiChartHome = async () => {
            const response = await getChartHome();
            if (region === 'Bai-hat-Viet-Nam') {
                setData(response.weekChart.vn);
                setSongs(response.weekChart.vn.items);
            } else if (region === 'Bai-hat-KPop') {
                setData(response.weekChart.korea);
                setSongs(response.weekChart.korea.items);
            } else {
                setData(response.weekChart.us);
                setSongs(response.weekChart.us.items);
            }
            setLoading(false);
        };
        getApiChartHome();
    }, [region]);

    const areas = [
        {
            title: 'VIỆT NAM',
            country: 'vn',
        },
        {
            title: 'US-UK',
            country: 'us',
        },
        {
            title: 'K-POP',
            country: 'korea',
        },
    ];
    const handleChangeArea = (data) => {
        if (data.country === 'korea') {
            navigation('/chart/zing-chart-tuan/Bai-hat-KPop/IWZ9Z0BO.html');
        } else if (data.country === 'vn') {
            navigation('/chart/zing-chart-tuan/Bai-hat-Viet-Nam/IWZ9Z08I.html');
        } else {
            navigation('/chart/zing-chart-tuan/Bai-hat-US-UK/IWZ9Z08I.html');
        }
    };

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('ChartHome', 'mt-5', 'flex', 'flex-col')}>
            <div className={cx('Chart-nav', 'flex')}>
                {areas.map((area) => (
                    <h2
                        onClick={() => {
                            handleChangeArea(area);
                        }}
                        className={cx('mx-3', `${data.country === area.country && 'active-title'}`)}
                        key={area.country}
                    >
                        {area.title}
                    </h2>
                ))}
            </div>
            <div
                className={cx(
                    'self-start',
                    'more-information',
                    'text-xs',
                    'text-slate-500',
                    'ml-7',
                    'mt-8',
                    'py-3',
                    'px-5',
                )}
            >
                Tuần : {data.week} ({data.startDate}/{data.endDate})
            </div>
            <ChartHomeItem data={songs} />
        </div>
    );
}
export default memo(ChartHome);
