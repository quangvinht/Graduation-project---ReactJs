import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './Player.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import getSong from '~/services/Song';
import {
    setSrcAudio,
    setIsLoop,
    setDiskPlay,
    setCurrentIndex,
    setCurrentSong,
    setSongPlay,
    setSongInfor,
    setIsRandom,
} from '~/redux/actions/musicAction';

import PropTypes from 'prop-types';
import AudioPlayer, { RHAP_UI } from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faRepeat, faShuffle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';

const cx = classNames.bind(styles);

function Player({ className }) {
    var audioPlayer = document.createElement('audio');

    const classes = [...className];
    const [expand, setExpand] = useState(false);
    const dispatch = useDispatch();
    let currentIndex = useSelector((state) => state.allMusics.currentIndex);

    let srcAudio = useSelector((state) => state.allMusics.srcAudio);

    let isLoop = useSelector((state) => state.allMusics.isLoop);
    let isRandom = useSelector((state) => state.allMusics.isRandom);

    let playListsDetail = useSelector((state) => state.allMusics.playLists);
    let playLists = playListsDetail.map((value) => value.encodeId);
    let currentSong = useSelector((state) => state.allMusics.currentSong);

    let songInfor = useSelector((state) => state.allMusics.songInfor);

    let songDetail = playListsDetail.find((value) => value.encodeId === currentSong);

    useEffect(() => {
        const getApiCategory = async () => {
            const response = await getSong(currentSong);
            if (response) {
                dispatch(setSrcAudio(Object.values(response)));
            }
        };
        getApiCategory();
    }, [currentSong]);

    let loopOnRef = useRef();
    let loopOffRef = useRef();
    let playerRef = useRef();

    var notify = (notifyText, type) => {
        toast(`🦄 ${notifyText}!!!`, {
            position: 'top-right',
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    };

    const handleOnPlay = () => {
        if (srcAudio) {
            notify('Mời bạn nghe');
        } else {
            notify('Bài này VIP');
        }
        dispatch(setDiskPlay(true));
    };
    const handleOnPause = () => {
        dispatch(setDiskPlay(false));
        notify(' Đã dừng ');
    };
    const handleOnclickNext = () => {
        if (isLoop) {
            if (currentIndex === playLists.length - 1) {
                dispatch(setCurrentIndex(0));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));
            } else if (currentIndex === 0) {
                dispatch(setCurrentIndex(0));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));
            } else {
                dispatch(setCurrentIndex((currentIndex += 1)));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));
                // notify(' Đang load ');
            }
        } else {
            if (currentIndex === playLists.length - 1) {
                // dispatch(setCurrentIndex(playLists.length - 1));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));

                dispatch(setSrcAudio(''));
            } else {
                dispatch(setCurrentIndex((currentIndex += 1)));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));
                // notify(' Đang load ');
            }
        }
        if (isRandom) {
            let random = Math.floor(Math.random() * playLists.length);
            dispatch(setCurrentIndex(random));
            dispatch(setCurrentSong(currentIndex));
            dispatch(setSongPlay(playLists[currentIndex]));
        }

        dispatch(setSongInfor(playListsDetail[currentIndex]));
        if (srcAudio) {
            notify(' Đang load ');
        } else {
            notify(' Bài này VIP ');
        }
    };
    const handleOnclickPrevious = () => {
        if (currentIndex === 0) {
            dispatch(setCurrentIndex(0));
            dispatch(setCurrentSong(currentIndex));
            dispatch(setSongPlay(playLists[currentIndex]));
        } else {
            dispatch(setCurrentIndex((currentIndex -= 1)));
            dispatch(setCurrentSong(currentIndex));
            dispatch(setSongPlay(playLists[currentIndex]));
            // notify(' Đang load ');
        }
        dispatch(setSongInfor(playListsDetail[currentIndex]));
        if (srcAudio) {
            notify(' Đang load ');
        } else {
            notify(' Bài này VIP ');
        }
    };
    const handleOnEnd = () => {
        if (isLoop) {
            if (currentIndex === playLists.length - 1) {
                dispatch(setCurrentIndex(0));
                dispatch(setCurrentSong(currentIndex));
                dispatch(setSongPlay(playLists[currentIndex]));
            }
        } else {
            dispatch(setSrcAudio(''));
        }
        if (isRandom) {
            let random = Math.floor(Math.random() * playLists.length);
            dispatch(setCurrentIndex(random));
            dispatch(setCurrentSong(currentIndex));
            dispatch(setSongPlay(playLists[currentIndex]));
        }
        if (srcAudio) {
            notify(' Đang load ');
        } else {
            notify(' Bài này VIP ');
        }
    };

    const handleLoopOn = () => {
        dispatch(setIsLoop(false));
    };
    const handleLoopOff = () => {
        dispatch(setIsLoop(true));
    };

    return (
        <div
            className={cx('Player', classes, [
                'z-20',
                `${expand && 'flex'}`,
                `${expand && 'flex-col'}`,
                `${expand && 'justify-evenly'}`,
                `${expand && 'bg-gradient'}`,
                'left-0',
                'right-0',
                'bottom-0',

                `${expand ? 'top-0' : 'top-84'}`,
            ])}
        >
            {expand && (
                <div className={cx('expand-player', ['flex', 'flex-col', 'mt-5', 'translate-x-20'])}>
                    <img
                        className={cx('image', [
                            'object-cover',
                            'object-center',
                            'self-center',
                            'rounded-2xl',
                            'w-1/4',
                            'h-3/4',
                        ])}
                        src={
                            songInfor.thumbnailM
                                ? songInfor.thumbnailM
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNF4-ua6gTKoU6Qxfm76h6u4vCwuvhzNBptw&usqp=CAU'
                        }
                        alt=""
                    />
                    <div className={cx('description', ['flex', 'flex-col', 'mt-10', 'self-center', 'text-center'])}>
                        <span className={cx('name-music', ['text-base', 'font-bold'])}>
                            {songInfor.title || 'Rick-roll :v'}
                        </span>
                        <span className={cx('artist', ['text-sm', 'font-thin'])}>
                            {songInfor.artistsNames || 'Rick Astley'}
                        </span>
                    </div>
                </div>
            )}
            <div className={cx('normal-player', ['flex', 'items-center', 'pt-2', 'px-5'])}>
                <div className={cx('infor', ['flex', 'pl-5', 'items-center', 'w-1/5'])}>
                    <img
                        className={cx('image', ['object-cover', 'object-center', 'rounded-2xl', 'w-1/5', ''])}
                        src={
                            songInfor.thumbnailM
                                ? songInfor.thumbnailM
                                : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNF4-ua6gTKoU6Qxfm76h6u4vCwuvhzNBptw&usqp=CAU'
                        }
                        alt=""
                    />
                    <div className={cx('description', ['flex', 'flex-col', 'ml-3'])}>
                        <span className={cx('name-music', ['text-base', 'font-bold'])}>
                            {songInfor.title || 'Rick-roll :v'}
                        </span>
                        <span className={cx('artist', ['text-sm', 'font-thin'])}>
                            {songInfor.artistsNames || 'Rick Astley'}
                        </span>
                    </div>
                </div>

                <div className={cx('player-item', ['flex-1', 'mx-5', ''])}>
                    <AudioPlayer
                        erf={playerRef}
                        className="audio"
                        autoPlay
                        showSkipControls
                        showFilledVolume
                        autoPlayAfterSrcChange
                        layout="stacked-reverse"
                        src={srcAudio[0]}
                        customAdditionalControls={[
                            RHAP_UI.LOOP,
                            <FontAwesomeIcon
                                onClick={() => {
                                    dispatch(setIsRandom(!isRandom));
                                }}
                                className={cx('random-btn', 'ml-8', `${isRandom && 'active-random'}`)}
                                icon={faShuffle}
                            />,
                        ]}
                        onPlay={() => {
                            handleOnPlay();
                            // dispatch(setSongInfor(songDetail));
                        }}
                        onPause={() => {
                            handleOnPause();
                        }}
                        onClickNext={() => {
                            handleOnclickNext();
                        }}
                        onClickPrevious={() => {
                            handleOnclickPrevious();
                        }}
                        onEnded={() => {
                            handleOnEnd();
                        }}
                        // other props here
                        customIcons={{
                            loop: (
                                <FontAwesomeIcon
                                    ref={loopOnRef}
                                    onClick={() => {
                                        handleLoopOn();
                                    }}
                                    icon={faRepeat}
                                />
                            ),
                            loopOff: (
                                <FontAwesomeIcon
                                    ref={loopOffRef}
                                    onClick={() => {
                                        handleLoopOff();
                                    }}
                                    icon={faRepeat}
                                    className={cx('text-white')}
                                />
                            ),
                        }}
                    />
                </div>
                <FontAwesomeIcon
                    onClick={() => setExpand(!expand)}
                    icon={faExpand}
                    className={cx('icon-expand', ['px-10', 'hidden', 'lg:block'])}
                />
            </div>
        </div>
    );
}

Player.propTypes = {
    className: PropTypes.array.isRequired,
};

export default Player;
