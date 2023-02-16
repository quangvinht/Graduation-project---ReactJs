import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './NewMusic.module.scss';
import getNewRelease from '~/services/NewRelease';
import Loading from '~/components/Loading';
import { setPlayLists, setCurrentIndex, setCurrentSong, setSongInfor } from '~/redux/actions/musicAction';
import { useDispatch } from 'react-redux';
import SongList from '~/components/SongList';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function NewMusic() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getApiNewReleases = async () => {
            const response = await getNewRelease();
            setData(response.items);
            setLoading(false);
            document.title = 'Nhạc mới';
        };
        getApiNewReleases();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('NewMusic', 'flex', 'flex-col')}>
            <div className={cx('title', 'text-5xl', 'flex', 'items-center', 'my-5')}>
                <span className={cx('font-bold')}>#Nhạc mới</span>

                <FontAwesomeIcon
                    onClick={() => {
                        dispatch(setPlayLists(data));
                        dispatch(setCurrentIndex(0));
                        dispatch(setCurrentSong(0));
                        dispatch(setSongInfor(data[0]));
                    }}
                    icon={faPlay}
                    className={cx('icon-play', 'text-base', 'ml-3', 'rounded-full', 'bg-violet-600', 'p-4')}
                />
            </div>
            <div className={cx('song-lists', 'flex', 'flex-col', 'text-base')}>
                {showMore
                    ? data.map((song, i) => {
                          return (
                              <SongList
                                  onClick={() => {
                                      dispatch(setPlayLists(data));
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
                    : data.slice(0, 10).map((song, i) => {
                          return (
                              <SongList
                                  onClick={() => {
                                      dispatch(setPlayLists(data));
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
        </div>
    );
}
export default memo(NewMusic);
