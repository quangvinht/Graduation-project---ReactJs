import { useState, useEffect, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useParams } from 'react-router-dom';
import getSearch from '~/services/Search';
import PlayList from '~/components/PlayList';
import Loading from '~/components/Loading';

import SongList from '~/components/SongList';

const cx = classNames.bind(styles);

function Search() {
    const [dataSongs, setDataSongs] = useState([]);
    const [dataPlayList, setDataPlayList] = useState([]);

    const [loading, setLoading] = useState(false);

    const { keyword } = useParams();

    useEffect(() => {
        setLoading(true);

        const getApiSearch = async () => {
            const results = await getSearch(keyword);
            setDataSongs(results.songs);
            setDataPlayList(results.playlists);
            setLoading(false);
            document.title = 'zing-mp3-clone';
        };
        getApiSearch();
    }, [keyword]);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Search', 'flex', 'flex-col', 'text-xs', '', '')}>
            <div className={cx('search-song')}>
                <div className={cx('header', 'text-3xl', 'font-bold', 'mb-10')}>
                    Kết quả tìm kiếm cho từ khóa "{keyword}"
                </div>
                <h1>Bài hát</h1>
                <div className={cx('song-list', 'flex', 'flex-col', '')}>
                    {dataSongs === undefined ? (
                        <h1 className={cx('', ['text-center', 'py-10'])}>Không tìm thấy kết quả</h1>
                    ) : (
                        dataSongs.map((item) => {
                            return <SongList key={item.encodeId} song={item} />;
                        })
                    )}
                </div>
            </div>
            <div className={cx('search-playlist', ['flex', 'flex-col', 'mt-10', ''])}>
                <h1>Playlist/Album</h1>
                <div
                    className={cx(
                        'play-list',
                        'grid',
                        'grid-cols-2',
                        'md:grid-cols-3',
                        'lg:grid-cols-5',
                        'gap-2',
                        'my-5',
                    )}
                >
                    {dataPlayList === undefined ? (
                        <h1 className={cx('', ['text-center', 'py-10'])}>Không tìm thấy kết quả</h1>
                    ) : (
                        dataPlayList.map((item) => {
                            return <PlayList key={item.encodeId} playlist={item} />;
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default memo(Search);
