import { memo } from 'react';
import classNames from 'classnames/bind';
import styles from './ChartHomeItem.module.scss';
import SongList from '~/components/SongList';
import { useDispatch } from 'react-redux';
import { setPlayLists, setCurrentIndex, setCurrentSong } from '~/redux/actions/musicAction';
const cx = classNames.bind(styles);

function ChartHomeItem({ data }) {
    const dispatch = useDispatch();
    return (
        <div className={cx('ChartHomeItem', 'flex', 'flex-col', 'text-base', 'mt-5')}>
            {data.map((song, i) => {
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
    );
}
export default memo(ChartHomeItem);
