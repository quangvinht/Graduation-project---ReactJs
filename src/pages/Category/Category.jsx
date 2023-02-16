import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Category.module.scss';
import getCategory from '~/services/Category';
import Loading from '~/components/Loading';
import PlayList from '~/components/PlayList';
import Button from '~/components/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Category() {
    const [topic, setTopic] = useState([]);
    const [genres, setGenres] = useState([]);

    const [loading, setLoading] = useState(false);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getApiCategory = async () => {
            const response = await getCategory();
            setTopic(response.topic);
            setGenres(response.genre);
            setLoading(false);
            document.title = 'Thể loại';
        };
        getApiCategory();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Category')}>
            <div className={cx('top-topic', 'flex', 'flex-col')}>
                <h2> Tâm Trạng Và Hoạt Động</h2>
                <div
                    className={cx('top-topic-list', 'grid', 'gap-1', 'grid-cols-2', 'md:grid-cols-3', 'lg:grid-cols-4')}
                >
                    {showMore
                        ? topic.map((topic) => {
                              return <PlayList playlist={topic} justImg />;
                          })
                        : topic.slice(0, 4).map((topic) => {
                              return <PlayList playlist={topic} justImg />;
                          })}
                </div>

                <Button
                    onClick={() => {
                        setShowMore(!showMore);
                    }}
                    outline
                    className={cx('self-center', 'my-8')}
                >
                    {showMore ? 'Thu gọn' : 'Xem Tất Cả'}
                </Button>
            </div>
            <div className={cx('genres')}>
                {genres.map((genre, i) => {
                    return (
                        <div className={cx('genres-list', 'flex', 'flex-col')}>
                            <div className={cx('header-genre', 'flex', 'justify-between')}>
                                <h2>{genre.title}</h2>
                                <div className={cx('btn-more', 'flex', 'items-center', 'text-sm')}>
                                    <span className={cx('')}>Tất cả</span>
                                    <FontAwesomeIcon icon={faAngleRight} />
                                </div>
                            </div>
                            <div
                                className={cx(
                                    'genres-items',
                                    'grid',
                                    'grid-cols-2',
                                    'md:grid-cols-3',
                                    'lg:grid-cols-5',
                                    'my-5',
                                )}
                            >
                                {genre.playlists.slice(0, 5).map((playlist, i) => {
                                    return <PlayList playlist={playlist} />;
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default memo(Category);
