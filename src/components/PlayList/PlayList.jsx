import React from 'react';
import classNames from 'classnames/bind';
import styles from './PlayList.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function PlayList({ playlist, justImg = false }) {
    const navigate = useNavigate();

    return (
        <div key={playlist.encodeId} className={cx('playlist', ['flex', 'flex-col', '', 'm-2'])}>
            <div className={cx('', [''])}>
                <div
                    onClick={() => {
                        navigate(`${playlist.link.replace('.html', '')}`);
                    }}
                    className={cx('', ['overflow-hidden', 'rounded-2xl', 'relative'])}
                >
                    <img
                        src={justImg ? playlist.thumbnailR : playlist.thumbnailM}
                        alt=""
                        className={cx('song-img', ['object-contain', 'rounded-xl', 'song-img--playlist'])}
                    />
                    {!justImg && (
                        <FontAwesomeIcon icon={faPlay} className={cx('play-icon-list', ['text-xl', 'absolute'])} />
                    )}
                </div>
            </div>
            {!justImg && (
                <span className={cx('play-title', ['my-3', 'font-bold', 'text-xl', ''])}>{playlist.title}</span>
            )}
            {!justImg && <span className={cx('play-description', ['', 'text-base'])}>{playlist.sortDescription}</span>}
        </div>
    );
}

PlayList.propTypes = {
    playlist: PropTypes.object.isRequired,
};
export default React.memo(PlayList);
