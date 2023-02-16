import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Artists.module.scss';
import { useParams } from 'react-router-dom';
import getArtist from '~/services/Artist';
import Button from '~/components/Button';
import Loading from '~/components/Loading';
import PlayList from '~/components/PlayList';
import SongList from '~/components/SongList';
import { setPlayLists, setCurrentIndex, setCurrentSong } from '~/redux/actions/musicAction';
import { useDispatch } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faPlay } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Artists() {
    let name = useParams();
    const dispatch = useDispatch();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [dataSections, setDataSetSections] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        setLoading(true);
        const getApiArtists = async () => {
            const response = await getArtist(name.nameArtists);
            setData(response);
            setDataSetSections(response.sections);
            setLoading(false);
            document.title = data.name;
        };
        getApiArtists();
    }, [name]);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Artists')}>
            <div
                className={cx(
                    'information',
                    'flex',
                    'flex-col',
                    'lg:flex-row',
                    'items-center',
                    'lg:justify-between',
                    'justify-center',
                )}
            >
                <div
                    className={cx(
                        'description',
                        'flex',
                        'flex-col',
                        'lg:w-1/2',
                        'w-full',
                        'lg:order-1',
                        'order-2',
                        'text-center',
                        'lg:text-left',
                    )}
                >
                    <h2>{data.name}</h2>
                    <span className={cx('text-base', 'my-3')}>
                        {data.sortBiography ? data.sortBiography : 'No Information'}
                    </span>
                    <Button
                        onClick={() => {
                            dispatch(setPlayLists(dataSections[0].items));
                            dispatch(setCurrentIndex(0));
                            dispatch(setCurrentSong(0));
                        }}
                        stroke
                        className={cx('btn', 'lg:self-start', 'flex', 'items-center', 'self-center')}
                    >
                        <FontAwesomeIcon
                            onClick={() => {
                                dispatch(setPlayLists(dataSections[0].items));
                                dispatch(setCurrentIndex(0));
                                dispatch(setCurrentSong(0));
                            }}
                            icon={faPlay}
                            className={cx('')}
                        />
                        <span className={cx('ml-1')}>PHÁT NHẠC</span>
                    </Button>
                </div>
                <img
                    src={data.thumbnailM}
                    alt={data.name}
                    className={cx(
                        'image',
                        'rounded-full',
                        'object-cover',
                        'object-center',
                        'lg:order-2',
                        'my-5',
                        'lg:my-0',
                    )}
                />
            </div>
            <div className={cx('sections', 'flex', 'flex-col', 'my-6')}>
                {dataSections.map((section, i) => {
                    return (
                        <div className={cx('section')}>
                            <h2>{section.title}</h2>
                            {section.sectionType === 'song' ? (
                                <div className={cx('section-song', 'flex', 'flex-col', 'text-base', 'text-slate-500')}>
                                    <div className={cx('flex', 'items,center', 'py-10', 'justify-between', 'px-1')}>
                                        <div className={cx('w-1/2', 'flex', 'items-center')}>
                                            <FontAwesomeIcon icon={faArrowRightArrowLeft} />
                                            <span className={cx('ml-2')}>Name</span>
                                        </div>
                                        <div className={cx('w-1/4', 'ml-9')}>ALBUM</div>
                                        <div className={cx('text-right')}>THỜI GIAN</div>
                                    </div>
                                    {showMore
                                        ? section.items.map((item, i) => (
                                              <SongList
                                                  onClick={() => {
                                                      dispatch(setPlayLists(dataSections[0].items));
                                                      dispatch(setCurrentIndex(i));
                                                      dispatch(setCurrentSong(i));
                                                  }}
                                                  song={item}
                                              />
                                          ))
                                        : section.items.slice(0, 10).map((item, i) => (
                                              <SongList
                                                  onClick={() => {
                                                      dispatch(setPlayLists(dataSections[0].items));
                                                      dispatch(setCurrentIndex(i));
                                                      dispatch(setCurrentSong(i));
                                                  }}
                                                  song={item}
                                              />
                                          ))}
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
                            ) : (
                                <div
                                    className={cx(
                                        'playlist',
                                        'grid',
                                        'grid-cols-2',
                                        'md:grid-cols-3',
                                        'lg:grid-cols-5',
                                        'gap-1',
                                    )}
                                >
                                    {section.items.map((item, i) => (
                                        <PlayList playlist={item} />
                                    ))}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
export default memo(Artists);
