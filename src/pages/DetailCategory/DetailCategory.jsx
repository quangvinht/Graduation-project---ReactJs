import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './DetailCategory.module.scss';
import { useParams } from 'react-router-dom';
import Loading from '~/components/Loading';
import getDetailCategory from '~/services/DetailCategory';
import PlayList from '~/components/PlayList';

const cx = classNames.bind(styles);

function DetailCategory() {
    let { id } = useParams();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [playlist, setPlaylists] = useState([]);
    useEffect(() => {
        const getApiCategory = async () => {
            setLoading(true);
            const response = await getDetailCategory(id);
            setData(response);
            setPlaylists(response.sections[0].items);
            setLoading(false);
        };
        getApiCategory();
    }, [id]);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('DetailCategory', 'mt-8', 'flex', 'flex-col')}>
            <img src={data.cover} alt="" className={cx('object-center', 'object-cover', 'rounded-xl')} />
            <h2 className={cx('my-3')}>PLAYLIST/ALBUM</h2>

            <div className={cx('grid', 'gap-1', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-5')}>
                {playlist.map((item) => {
                    return <PlayList playlist={item} />;
                })}
            </div>
        </div>
    );
}
export default memo(DetailCategory);
