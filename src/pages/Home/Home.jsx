import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import getHome from '~/services/Home';
import Slider from '~/components/Slider';
import Loading from '~/components/Loading';
import PlayList from '~/components/PlayList';

const cx = classNames.bind(styles);

const Home = () => {
    const [dataSlide, setDataSlide] = useState([]);
    const [dataList, setDataList] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);

        const getApiHome = async () => {
            const response = await getHome();
            setDataSlide(response.items[0].items);

            setDataList(response.items.filter((item) => item.sectionType === 'playlist'));

            setLoading(false);
            document.title = 'zing-mp3-clone';
        };
        getApiHome();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('home', 'flex', 'flex-col')}>
            <Slider dataSlide={dataSlide} />
            {dataList.map((list, i) => {
                return (
                    <div key={i} className={cx('list', 'my-5')}>
                        <h3 className={cx('list-title', 'my-5')}>{list.title}</h3>
                        <div
                            className={cx(
                                'list-grid',
                                'grid',
                                'gap-2',
                                'lg:grid-cols-5',
                                'md:grid-cols-3',
                                'grid-cols-2',
                            )}
                        >
                            {list.items.map((item, i) => (
                                <PlayList playlist={item} key={i} />
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default memo(Home);
