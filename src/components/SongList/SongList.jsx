import { memo, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './SongList.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSongPlay, setSongInfor } from '~/redux/actions/musicAction';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripLines, faMusic, faPlay } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function SongList({ song, chart, number, nTitle, onClick }) {
    const navigate = useNavigate();
    let songRef = useRef();
    let vipRef = useRef();
    const isSongPlay = useSelector((state) => state.allMusics.isSongPlay);
    let isDiskPlay = useSelector((state) => state.allMusics.isDiskPlay);
    const dispatch = useDispatch();
    var notify = (notifyText, type) => {
        if (type === 'warn') {
            toast.warn(`🦄 ${notifyText}!!!`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } else {
            toast(`🦄 ${notifyText}!!!`, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const handleActiveSong = () => {
        dispatch(setSongPlay(song.encodeId));
        if (songRef.current.classList.contains('SongList_active__OeuDz')) {
            songRef.current.classList.remove('SongList_active__OeuDz');
        } else {
            songRef.current.classList.add('SongList_active__OeuDz');
        }
        if (vipRef.current) {
            notify('Bài này vip', 'warn');
        } else {
            notify('Đang load ');
        }
    };

    var minutes = Math.floor(song.duration / 60);
    var seconds = song.duration - minutes * 60;
    return (
        <>
            <div
                onClick={() => {
                    handleActiveSong();
                    onClick && onClick();
                    // dispatch(setCurrentSong(song.encodeId));
                    dispatch(setSongInfor(song));
                }}
                ref={songRef}
                className={cx('song', `${isSongPlay === song.encodeId && isDiskPlay ? 'active' : ''}`, [
                    'flex',
                    'items-center',
                    'py-10',
                    'justify-between',
                    'px-1',
                ])}
            >
                <div className={cx(`${nTitle ? 'w-10/12' : 'w-1/2'}`, ['flex', 'items-center', ''])}>
                    {chart && (
                        <div className={cx('number', 'text-3xl', 'font-bold', 'mx-2', `num-${number + 1}`)}>
                            {number + 1}
                        </div>
                    )}

                    {chart ? (
                        <FontAwesomeIcon icon={faGripLines} className={cx('song-icon', ['text-base'])} />
                    ) : (
                        <FontAwesomeIcon icon={faMusic} className={cx('song-icon', ['text-base'])} />
                    )}

                    <div className={cx('', ['relative'])}>
                        <img
                            src={song.thumbnail}
                            onClick={() => {
                                onClick && onClick();
                            }}
                            alt=""
                            className={cx('song-img', ['w-10', 'rounded-lg', 'object-center', 'object-cover', 'ml-5'])}
                        />
                        <FontAwesomeIcon
                            onClick={() => {
                                onClick && onClick();
                            }}
                            icon={faPlay}
                            className={cx('play-icon', ['absolute', 'text-xs'])}
                        />
                    </div>
                    <div styles={{ backgroundImage: `url(${false})` }}></div>
                    <div
                        className={cx('song-infor', [
                            '',
                            'flex',
                            'flex-col',
                            `${nTitle ? 'w-24' : 'w-36'}`,
                            'text-xs',
                            'relative',
                            'ml-8',
                            'md:ml-5',
                        ])}
                    >
                        <span className={cx('song-title', 'font-bold', '', `${nTitle && 'truncate'}`)}>
                            {song.title}
                        </span>
                        <div
                            className={cx(
                                'song-artists',
                                'flex',
                                'overflow-hidden',
                                'text-sm',
                                'w-full',
                                'whitespace-nowrap',
                                'text-ellipsis',
                                `${nTitle && ''}`,
                            )}
                        >
                            {song.artists &&
                                song.artists.map((artistName, i) => {
                                    return (
                                        <span
                                            onClick={() => {
                                                navigate(`/artists/${artistName.alias}`);
                                            }}
                                            key={i}
                                            className={cx('mr-1', 'artist', 'hoverPointer')}
                                        >
                                            {artistName.name}
                                        </span>
                                    );
                                })}
                        </div>

                        {(song.streamingStatus === 1 && song.isWorldWide === true) || song.type === 'livestream' ? (
                            ''
                        ) : (
                            <span
                                ref={vipRef}
                                className={cx(
                                    'vip',
                                    'absolute',
                                    'text-black',
                                    'bg-yellow-400',
                                    'overflow-visible',
                                    'rounded-md',

                                    'font-bold',
                                )}
                            >
                                VIP
                            </span>
                        )}
                    </div>
                </div>

                {!nTitle && (
                    <div
                        onClick={() => {
                            // navigate(`/album/${song.alias}/${song.encodeId}`);
                            navigate(`${song.album.link.replace('.html', '')}`);
                        }}
                        className={cx('song-detail', 'hoverPointer', ['w-1/4', 'text-xs', 'text-slate-500'])}
                    >
                        {song.title}
                    </div>
                )}

                <div className={cx('song-duration', '')}>
                    {minutes}:{seconds}
                </div>
            </div>
            {/* <ToastContainer newestOnTop /> */}
        </>
    );
}

SongList.propTypes = {
    song: PropTypes.object.isRequired,
};
export default memo(SongList);
