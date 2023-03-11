import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '~/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Profile = () => {
    // const profile = useSelector((state) => state.allEvents.profile);
    const profile = JSON.parse(localStorage.getItem('profile'));

    //const idUserInfor = useSelector((state) => state.allEvents.userInfor);
    const [loading, setLoading] = useState(false);
    //const [data, setData] = useState(profile);
    const navigate = useNavigate();

    // useEffect(() => {
    //     setLoading(true);

    //     const getProfileUser = async () => {
    //         await axios({
    //             method: 'get',
    //             url: `http://localhost:8080/user/all/${idUserInfor}`,
    //         })
    //             .then((response) => {
    //                 setData(response.data);
    //             })
    //             .catch((error) => {
    //                 console.error(error);
    //             });
    //     };
    //     getProfileUser();
    //     setLoading(false);
    // }, []);

    return (
        <>
            {!loading && (
                <div className={cx('profile', 'flex', 'flex-col', 'items-center', 'w-full', 'gap-3', 'mb-5')}>
                    <h2 className={cx('title', '')}>Thông tin người dùng</h2>

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
                        <span className={cx('infor', 'py-3', 'px-4', '', 'md:w-4/5', 'w-2/3')}>{profile.password}</span>
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
                            {profile.birthDate || 'YYYY-MM-DD'}
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
                            {profile.createdAt}
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
