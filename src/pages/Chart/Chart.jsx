import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Chart.module.scss';
import getChartHome from '~/services/ChartHome';
import Loading from '~/components/Loading';
import SongList from '~/components/SongList';
import Button from '~/components/Button';
import WeeklyChart from '~/components/WeeklyChart';
import { setPlayLists, setCurrentIndex, setCurrentSong, setSongInfor } from '~/redux/actions/musicAction';
import { useDispatch } from 'react-redux';

import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const cx = classNames.bind(styles);

function Chart() {
    const [RTChart, setRTChart] = useState([]);
    const [weekChart, setweekChart] = useState([]);
    const [showMore, setShowMore] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);

        const getApiChart = async () => {
            const response = await getChartHome();
            setRTChart(response.RTChart.items);
            setweekChart(Object.values(response.weekChart));
            setLoading(false);
            document.title = '#zingchart';
        };
        getApiChart();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Chart', 'flex', 'flex-col')}>
            <div className={cx('title', 'text-5xl', 'flex', 'items-center', 'my-5')}>
                <span className={cx('font-bold')}>#zingchart</span>
                <FontAwesomeIcon
                    onClick={() => {
                        dispatch(setPlayLists(RTChart));
                        dispatch(setSongInfor(RTChart[0]));
                        dispatch(setCurrentIndex(0));
                        dispatch(setCurrentSong(0));
                    }}
                    icon={faPlay}
                    className={cx('icon-play', 'text-base', 'ml-3', 'rounded-full', 'bg-violet-600', 'p-4')}
                />
            </div>
            <div className={cx('song-lists', 'flex', 'flex-col', 'text-base')}>
                {showMore
                    ? RTChart.map((song, i) => {
                          return (
                              <SongList
                                  onClick={() => {
                                      dispatch(setPlayLists(RTChart));
                                      dispatch(setCurrentIndex(i));
                                      dispatch(setCurrentSong(i));
                                  }}
                                  number={i}
                                  chart
                                  key={song.encodeId}
                                  song={song}
                              />
                          );
                      })
                    : RTChart.slice(0, 10).map((song, i) => {
                          return (
                              <SongList
                                  onClick={() => {
                                      dispatch(setPlayLists(RTChart));
                                      dispatch(setCurrentIndex(i));
                                      dispatch(setCurrentSong(i));
                                  }}
                                  number={i}
                                  chart
                                  key={song.encodeId}
                                  song={song}
                              />
                          );
                      })}
            </div>
            <Button
                onClick={() => {
                    setShowMore(!showMore);
                }}
                outline
                className={cx('self-center', 'my-8')}
            >
                {showMore ? 'Thu gọn' : 'Xem Tất Cả'}
            </Button>
            <div className={cx('weekly-chart', 'flex', 'flex-col', 'mt-10')}>
                <span className={cx('text-4xl', 'font-bold', 'self-center', 'my-10')}>Bảng Xếp Hạng Tuần</span>
                <WeeklyChart areas={weekChart} />
            </div>
        </div>
    );
}
export default memo(Chart);
