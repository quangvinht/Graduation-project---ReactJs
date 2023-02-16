import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Album.module.scss';
import { useParams } from 'react-router-dom';
import getDetailPlaylist from '~/services/DetailPlaylist';
import Loading from '~/components/Loading';
import SongList from '~/components/SongList';
import { setPlayLists, setCurrentIndex, setCurrentSong, setSongInfor } from '~/redux/actions/musicAction';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faArrowRightArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function Album() {
    const { id } = useParams();

    let isDiskPlay = useSelector((state) => state.allMusics.isDiskPlay);

    const [data, setData] = useState([]);
    const [playLists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(false);
    const [circles, setCircles] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);
        const getApiDetailPlayList = async () => {
            const response = await getDetailPlaylist(id);
            setData(response);
            setPlaylists(response.song.items);
            setLoading(false);
        };
        getApiDetailPlayList();
    }, [id]);

    const handleCircle = () => {
        setCircles(!circles);
    };
    let dataForList = playLists.map((item) => {
        return item.encodeId;
    });
    const notify = () => {
        if (isDiskPlay === true) {
            toast(`🦄 Album này`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else if (isDiskPlay === false) {
            toast(`🦄 Album này`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };
    var player = document.querySelector('audio');

    return loading ? (
        <Loading />
    ) : (
        <>
            <div className={cx('Album', 'flex', 'flex-col', 'lg:flex-row', 'mt-5')}>
                <div
                    className={cx('information', 'flex', 'flex-col', 'items-center', 'text-sm', 'lg:fixed', 'lg:w-1/4')}
                >
                    <div
                        onClick={() => {
                            handleCircle();
                            dispatch(setPlayLists(playLists));
                            dispatch(setCurrentIndex(0));
                            dispatch(setCurrentSong(0));
                            dispatch(setSongInfor(playLists[0]));

                            notify();
                            if (isDiskPlay === true) {
                                player.pause();
                            } else {
                                player.play();
                            }
                        }}
                        className={cx('image', ['overflow-hidden', 'rounded-2xl', 'relative'])}
                    >
                        <img
                            src={data.thumbnailM || data.thumbnail}
                            alt=""
                            className={cx('song-img', [
                                'object-contain',

                                'song-img--playlist',
                                `${isDiskPlay ? 'active' : 'rounded-xl'}`,
                            ])}
                        />

                        <FontAwesomeIcon
                            icon={faPlay}
                            className={cx('play-icon-list', ['text-xl', 'absolute', 'text-3xl'])}
                        />
                    </div>
                    <div
                        className={cx('', 'description', 'text-slate-500', 'flex', 'flex-col', 'items-center', 'my-1')}
                    >
                        <div className={cx('text-white', 'text-xl', 'title', 'text-center')}>{data.title}</div>
                        <span>Cập nhập : {new Date(data.contentLastUpdate * 1000).toLocaleDateString()}</span>
                        <span>Người tạo : {data.userName}</span>
                        <span>Người yêu thích: {data.like}</span>
                    </div>
                </div>
                <div className={cx('album-playlists', 'lg:ml-80', 'flex-1')}>
                    <div
                        className={cx(
                            'flex',
                            'items,center',
                            'py-10',
                            'justify-between',
                            'px-1',
                            'text-base',
                            'text-slate-500',
                        )}
                    >
                        <div className={cx('w-1/2', 'flex', 'items-center')}>
                            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                            <span className={cx('ml-2')}>Name</span>
                        </div>
                        <div className={cx('w-1/4', 'ml-9')}>ALBUM</div>
                        <div className={cx('text-right')}>THỜI GIAN</div>
                    </div>
                    <div className={cx('song', 'flex', 'flex-col')}>
                        {playLists &&
                            playLists.map((song, i) => (
                                <SongList
                                    key={i}
                                    onClick={() => {
                                        dispatch(setPlayLists(playLists));
                                        dispatch(setCurrentIndex(i));
                                        dispatch(setCurrentSong(i));
                                    }}
                                    song={song}
                                />
                            ))}
                    </div>
                </div>
            </div>
            {/* <ToastContainer newestOnTop /> */}
        </>
    );
}
export default memo(Album);
