import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Top100.module.scss';
import getTop100 from '~/services/Top100';
import Loading from '~/components/Loading';
import PlayList from '~/components/PlayList';

const cx = classNames.bind(styles);

function Top100() {
    const [data, setData] = useState([]);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getApi100 = async () => {
            const response = await getTop100();
            setData(response);
            setLoading(false);
            document.title = 'Top 100';
        };
        getApi100();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Top100')}>
            {data.map((item, i) => {
                return (
                    <div className={cx('top100-list', 'flex', 'flex-col')}>
                        <div className={cx('header-genre', 'flex', 'justify-between')}>
                            <h2>{item.title}</h2>
                        </div>
                        <div
                            className={cx(
                                'top100-items',
                                'grid',
                                'grid-cols-2',
                                'md:grid-cols-3',
                                'lg:grid-cols-5',
                                'my-5',
                            )}
                        >
                            {item.items.slice(0, 5).map((playlist, i) => {
                                return <PlayList playlist={playlist} />;
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
export default memo(Top100);
