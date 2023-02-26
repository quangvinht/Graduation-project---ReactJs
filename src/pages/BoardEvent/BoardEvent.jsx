import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardEvent.module.scss';
import axios from 'axios';
import EventCard from '~/components/EventCard';
import ReactPaginate from 'react-paginate';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import EventForm from '~/components/EventForm';

const cx = classNames.bind(styles);

const BoardEvent = () => {
    const [dataEvent, setDataEvent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalEvents, setTotalEvents] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const [cardDisabled, setCardDisabled] = useState('');
    const [show, setShow] = useState(true);
    const eventPerPage = 3;

    useEffect(() => {
        setLoading(true);

        const getAPIEvent = async () => {
            await axios
                .get(`http://localhost:8080/event?page=${pageNumber === 0 ? 1 : pageNumber}&limit=${eventPerPage}`, {})
                .then((response) => {
                    setDataEvent(response.data.data);
                    setTotalEvents(response.data.total);
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };

        getAPIEvent();
    }, [pageNumber]);

    const handleNextPage = () => {
        if (pageNumber >= Math.ceil(totalEvents / eventPerPage)) {
            setPageNumber(Math.ceil(totalEvents / eventPerPage) - 1);
        }
        setPageNumber((prevValue) => prevValue + 1);
    };
    const handlePrePage = () => {
        if (pageNumber <= 2) {
            setPageNumber(1);
        }
        if (pageNumber === 0) {
            setPageNumber((prevValue) => prevValue + 1);
        }
        setPageNumber((prevValue) => prevValue - 1);
    };

    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
            if (screenSize.width >= 768) {
                setShow(true);
            }
        };

        window.addEventListener('resize', handleResize);
    }, [screenSize.width]);

    return (
        <div className={cx('board-event', 'flex', 'flex-col', 'md:flex-row', 'md:justify-between', 'justify-center')}>
            <div className={cx('show-form', 'md:hidden', 'block', 'flex', 'items-center', 'gap-1', 'my-4')}>
                {!show ? (
                    <Button
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={cx('btn-show', 'flex', 'gap-1', 'items-center')}
                    >
                        <FontAwesomeIcon icon={faEye} className={cx('eye-show', '')} /> <h4>Hiện form :</h4>
                    </Button>
                ) : (
                    <Button
                        onClick={() => {
                            setShow(!show);
                        }}
                        className={cx('btn-hidden', 'flex', 'gap-1', 'items-center')}
                    >
                        {' '}
                        <FontAwesomeIcon icon={faEyeSlash} className={cx('eye-show', '')} /> <h4>Ẩn form :</h4>
                    </Button>
                )}
            </div>
            {show && <EventForm className={cx(`${!show && 'hidden'}`, 'md:block', 'event-form', 'flex-1', 'mr-5')} />}

            <div className={cx('board', 'flex-1', 'flex', 'flex-col', 'md:items-end', 'items-center', 'md:w-full')}>
                <div className={cx()}>
                    <h4 className={cx('event-list-tag')}>Danh sách sự kiện:</h4>
                    {dataEvent.map((event) => {
                        return <EventCard id={event.id} key={event._id} data={event} />;
                    })}
                </div>
                <div className={cx('pagination', 'flex', 'self-center', 'lg:self-end')}>
                    <Button
                        className={cx(
                            'mr-2',
                            'w-1/2',
                            'bg-blue-700',
                            `${(pageNumber === 1 || pageNumber === 0) && 'hover:bg-gray-400'}`,
                            `${(pageNumber === 1 || pageNumber === 0) && 'bg-gray-400'}`,
                        )}
                        onClick={handlePrePage}
                    >
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </Button>
                    <Button
                        className={cx(
                            'w-1/2',
                            'bg-blue-700',
                            `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'bg-gray-400'}`,
                            `${pageNumber === Math.ceil(totalEvents / eventPerPage) && 'hover:bg-gray-400'}`,
                        )}
                        onClick={handleNextPage}
                    >
                        <FontAwesomeIcon icon={faArrowRight} />
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(BoardEvent);
