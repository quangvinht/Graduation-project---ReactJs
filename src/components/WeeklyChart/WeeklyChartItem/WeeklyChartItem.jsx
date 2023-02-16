import React from 'react';
import classNames from 'classnames/bind';
import styles from './WeeklyChartItem.module.scss';
import SongList from '../../SongList';
import Button from '../../Button';
import { useNavigate } from 'react-router-dom';
import { setPlayLists, setCurrentIndex, setCurrentSong, setSongInfor } from '~/redux/actions/musicAction';
import { useDispatch } from 'react-redux';

import PropTypes from 'prop-types';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const cx = classNames.bind(styles);

function WeeklyChartItem({ area, region }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    return (
        <div key={area.encodeId} className={cx('chart-list', 'flex', 'flex-col', 'p-2', 'rounded-2xl')}>
            <div className={cx('chart-title', 'flex', 'items-center', 'my-3')}>
                <span className={cx('font-bold', 'ml-5')}>{region}</span>
                <FontAwesomeIcon
                    icon={faPlay}
                    onClick={() => {
                        console.log(area);
                        dispatch(setPlayLists(area.items));
                        dispatch(setCurrentIndex(0));
                        dispatch(setSongInfor(area.items[0]));

                        dispatch(setCurrentSong(0));
                    }}
                    className={cx('icon-play', 'text-base', 'ml-3', 'rounded-full', 'bg-violet-600', 'p-4')}
                />
            </div>
            {area.items.slice(0, 5).map((item, i) => {
                return (
                    <SongList
                        onClick={() => {
                            dispatch(setPlayLists(area.items));
                            dispatch(setCurrentIndex(i));

                            dispatch(setCurrentSong(i));
                        }}
                        nTitle
                        number={i}
                        key={item.encodeId}
                        chart
                        song={item}
                    />
                );
            })}
            <Button
                onClick={() => {
                    navigate(`/chart${area.link}`);
                    dispatch(setPlayLists(area.items));
                    dispatch(setCurrentIndex(0));
                    dispatch(setSongInfor(area.items[0]));
                    dispatch(setCurrentSong(0));
                }}
                outline
                className={cx('self-center', 'mt-5')}
            >
                Xem tất cả
            </Button>
        </div>
    );
}

WeeklyChartItem.propTypes = {
    area: PropTypes.object.isRequired,
    region: PropTypes.string.isRequired,
};
export default React.memo(WeeklyChartItem);
