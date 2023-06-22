import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EventCard.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarCheck, faHandPointRight, faPenToSquare, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import Button from '../Button';
import { useDispatch, useSelector } from 'react-redux';
import { addAndEditParticipant, editEvent, editParticipant, addParticipant } from '~/redux/actions/eventAction';
import axios from 'axios';
import { faToolbox, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { logDOM } from '@testing-library/react';

const cx = classNames.bind(styles);

function EventCard({ data, className, onClick = false, onDoubleClick = false, disabled = false }) {
    const classes = cx('EventCard', {
        disabled,
        [className]: className,
    });

    const [datetime, setDatetime] = useState(getCurrentDateTime());
    const [isDisable, setIsDisable] = useState(false);
    const [participants, setParticipants] = useState(data.participants.map((participant) => participant._id));
    const profile = JSON.parse(localStorage.getItem('profile'));

    function getCurrentDateTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const date = now.getDate().toString().padStart(2, '0');
        const hour = now.getHours().toString().padStart(2, '0');
        const minute = now.getMinutes().toString().padStart(2, '0');
        const second = now.getSeconds().toString().padStart(2, '0');
        return `${year}-${month}-${date}T${'23'}:${'59'}:${'59'}`;
    }
    const convertDate = (time) => {
        return `${time.getDate()}/${
            time.getMonth() + 1
        }/${time.getFullYear()} lúc ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    };

    const dateCurrent = new Date(datetime);
    const dateEndEvent = new Date(data.endDate);
    const dateStartEvent = new Date(data.startDate);

    //const isUpdate = useSelector((state) => state.allEvents.isUpdateEvent);
    const dispatch = useDispatch();

    const handleDeleteEvent = (id) => {
        axios
            .delete(`${process.env.REACT_APP_BASE_URL_API}event/all/${id}`)
            .then((response) => {
                alert('Xóa sự kiện thành công:', data.title);
                window.location.reload();
            })
            .catch((error) => {
                alert('Xóa sự kiện thất bại:', error);
            });
    };

    const handleJoin = async () => {
        //add participant:

        await axios
            .patch(`${process.env.REACT_APP_BASE_URL_API}event/all/${data._id}`, {
                participants: [...participants, profile._id],
            })
            .then((response) => {
                alert('Tham gia thành công : ' + data.title);

                window.location.reload();
            })
            .catch((error) => {
                alert('Tham gia thất bại :' + data.title);

                console.log(error);
            });
        // add eventJoined:

        // await axios
        //     .get(`${process.env.REACT_APP_BASE_URL_API}user/all/${profile._id}`)
        //     .then((response) => {
        //         axios
        //             .patch(`${process.env.REACT_APP_BASE_URL_API}user/all/${response.data._id}`, {
        //                 eventsJoined: [...response.data.eventsJoined, data._id],
        //             })
        //             .then((response) => {
        //                 console.log(response);
        //             })
        //             .catch((error) => {});
        //     })
        //     .catch((error) => {});
    };

    const { pathname } = useLocation();

    return (
        <div
            className={cx(
                'event-card',
                'gap-1',
                'w-full',
                'flex',
                'flex-col',
                'py-4',
                'px-5',
                'text-base',
                'mb-3',
                `${dateCurrent.getTime() < dateEndEvent.getTime() && 'disable'}`,
                `${isDisable && 'disable'}`,
                classes,
            )}
            onDoubleClick={() => {
                setIsDisable(!isDisable);
            }}
        >
            <div className={cx('title-and-type', 'flex', 'justify-between', 'items-center')}>
                <span className={cx('title', 'text-lg', 'font-extrabold', 'text-xl', 'text-blue-600')}>
                    {data.title}
                </span>
                <div
                    className={cx(
                        'type',
                        'text-xs',
                        `${data.type === 'quan trọng' && 'bg-red-600'}`,
                        `${data.type === 'bình thường' && 'bg-green-600'}`,
                        `${data.type === 'ưu tiên' && 'bg-blue-600'}`,
                        'w-1/5',
                        'text-center',
                        // 'bg-red-600',
                        'text-yellow-50',
                        'p-1',
                        'ml-2',
                        'rounded-lg',
                        'font-bold',
                    )}
                >
                    <span className={cx('')}>{data.type}</span>
                </div>
            </div>

            <div className={cx('description')}>
                <FontAwesomeIcon icon={faPenToSquare} />
                <span className={cx('ml-1')}>{data.description}</span>
            </div>
            <div className={cx('date', 'self-start', 'flex', 'flex-col')}>
                <div>
                    <FontAwesomeIcon icon={faCalendarCheck} />

                    <span className={cx('start-date', 'ml-1')}>{convertDate(dateStartEvent)}</span>
                </div>

                <div>
                    <FontAwesomeIcon icon={faCalendarCheck} />

                    <span className={cx('end-date', 'ml-1')}>{convertDate(dateEndEvent)}</span>
                </div>
            </div>
            <div className={cx('btn-event', 'flex')}>
                {pathname === '/board-events' && (
                    <>
                        <Button
                            onClick={() => {
                                dispatch(editEvent(data._id));
                                dispatch(
                                    editParticipant(
                                        data.participants.map((participant) => {
                                            return { label: participant.email, value: participant._id };
                                        }),
                                    ),
                                );
                                dispatch(
                                    addAndEditParticipant(
                                        data.participants.map((participant) => {
                                            return { label: participant.email, value: participant._id };
                                        }),
                                    ),
                                );
                            }}
                            className={cx('lg:w-1/5', 'w-2/6')}
                            blackBtn
                        >
                            <FontAwesomeIcon icon={faToolbox} className={cx('edit-icon', 'mr-1')} /> Edit
                        </Button>
                        <Button
                            onClick={() => {
                                handleDeleteEvent(data._id);
                            }}
                            className={cx('lg:w-1/5', 'w-2/6', 'ml-1')}
                            redBtn
                        >
                            <FontAwesomeIcon icon={faTrashCan} className={cx('delete-icon', 'mr-1')} /> Delete
                        </Button>
                    </>
                )}

                {pathname === '/home' && (
                    <>
                        {' '}
                        <Button
                            disabled={disabled}
                            onClick={() => {
                                handleJoin();
                            }}
                            greenBtn
                            className={cx('md:w-1/5', 'ml-auto', 'mr-auto')}
                        >
                            <FontAwesomeIcon
                                icon={faHandPointRight}
                                className={cx('delete-icon', 'mr-1', 'move-animation', 'mr-3')}
                            />{' '}
                            <span className={cx('text', 'mx-3')}>{disabled ? 'Đã tham gia' : 'Tham gia ngay'}</span>
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}

EventCard.propTypes = {};
export default React.memo(EventCard);
