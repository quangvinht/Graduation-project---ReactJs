import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardEvent.module.scss';
import axios from 'axios';
import EventCard from '~/components/EventCard';
import ReactPaginate from 'react-paginate';
import Button from '~/components/Button';

const cx = classNames.bind(styles);

const BoardEvent = () => {
    const [dataEvent, setDataEvent] = useState([]);
    const [loading, setLoading] = useState(false);
    const [totalEvents, setTotalEvents] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);
    const eventPerPage = 4;

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
        if (pageNumber <= 1) {
            setPageNumber(1);
        }
        if (pageNumber === 0) {
            setPageNumber((prevValue) => prevValue + 1);
        }
        setPageNumber((prevValue) => prevValue - 1);
    };

    return (
        <div className={cx('board-event', 'flex', 'flex-col', 'md:flex-row', 'md:justify-between', 'justify-center')}>
            <div className={cx('event-form', 'flex-1', 'h-36')}>Hello</div>
            <div className={cx('board', 'flex-1', 'flex', 'flex-col', 'md:items-end', 'items-center', 'md:w-full')}>
                <div className={cx()}>
                    {dataEvent.map((event) => {
                        return <EventCard key={event._id} data={event} />;
                    })}
                </div>
                <div className={cx('pagination', 'flex', '')}>
                    <Button className={cx('mr-2', 'w-1/2')} onClick={handlePrePage}>
                        Previous
                    </Button>
                    <Button className={cx('w-1/2')} onClick={handleNextPage}>
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default memo(BoardEvent);
