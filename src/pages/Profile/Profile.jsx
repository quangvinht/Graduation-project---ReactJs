import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '~/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const cx = classNames.bind(styles);

const Profile = () => {
    // const profile = useSelector((state) => state.allEvents.profile);
    //const [profile,setProfile] = useSelector(JSON.parse(localStorage.getItem('profile')))
    const profile = JSON.parse(localStorage.getItem('profile'));

    //const idUserInfor = useSelector((state) => state.allEvents.userInfor);
    const [loading, setLoading] = useState(false);
    //const [data, setData] = useState(profile);
    const navigate = useNavigate();

    const [events, setEvents] = useState([]);

    // pathname === '/profile' && window.location.reload();
    const formatDate = (date) => {
        return format(new Date(date), 'dd/MM/yyyy');
    };
    const convertISODate = (dateISO) => {
        const date = new Date(dateISO);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const seconds = date.getSeconds().toString().padStart(2, '0');

        const formattedDateString = `${hours}:${minutes}:${seconds} - ${day}/${month}/${year}`;
        return formattedDateString;
    };

    useEffect(() => {
        setLoading(true);

        const getAllEvent = async () => {
            await axios
                .get(`http://localhost:8080/event/all`)
                .then((response) => {
                    setEvents(response.data.filter((event) => event.participants.includes(profile._id)));
                })
                .catch((error) => {});
        };
        getAllEvent();
        setLoading(false);
    }, []);

    return (
        <>
            {!loading && (
                <div className={cx('profile', 'flex', 'flex-col', 'items-center', 'w-full', 'gap-3', 'mb-5')}>
                    <h2 className={cx('title', 'text-center')}>Thông tin người dùng</h2>

                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>ID:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {profile._id}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>Tên người dùng:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {profile.userName ? profile.userName : 'Tên chưa được đặt'}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>Email:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {profile.email}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>Mật khẩu:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3')}>
                            {profile.password.substring(0, 2).padEnd(profile.password.length, '*')}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>CMND/ CCCD:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {profile.identifyCard || '*********'}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>Ngày sinh:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {formatDate(profile.birthDate) || 'DD/MM/YYYY'}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/3')}>SĐT:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {profile.phoneNumber || 'XXXXXXXXXXX'}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5')}>Ngày tạo:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            {convertISODate(profile.createdAt)}
                        </span>
                    </div>
                    <div
                        className={cx(
                            'field',
                            'flex',
                            'md:gap-6',
                            'gap-2',
                            'items-center',
                            'justify-between',
                            'w-full',
                        )}
                    >
                        <h5 className={cx('lable', 'word-break', 'md:w-1/5', 'w-1/6')}>Các sự kiện tham gia:</h5>
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3', 'break-words')}>
                            <ul>
                                {events.map((event) => (
                                    <li>.{event.title}</li>
                                ))}
                            </ul>
                        </span>
                    </div>

                    <Button
                        className={cx('btn-edit-user', 'w-1/3', 'mt-7')}
                        onClick={() => {
                            navigate('/profile/edit');
                        }}
                    >
                        Chỉnh sửa
                    </Button>
                </div>
            )}
        </>
    );
};

export default memo(Profile);
