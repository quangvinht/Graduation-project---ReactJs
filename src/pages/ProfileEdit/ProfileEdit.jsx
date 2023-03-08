import React from 'react';
import classNames from 'classnames/bind';
import styles from './ProfileEdit.module.scss';
import { useEffect, useState, memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Button from '~/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';
const cx = classNames.bind(styles);

function ProfileEdit({}) {
    const navigate = useNavigate();
    const idUserInfor = useSelector((state) => state.allEvents.userInfor);

    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [identifyCard, setIdentifyCard] = useState();
    const [birthDate, setBirthDate] = useState();
    const [phoneNumber, setPhoneNumber] = useState();

    const handlePhoneNumber = (event) => {
        const phoneNumber = event.target.value.replace(/\D/g, '');
        // Giới hạn độ dài chuỗi nhập vào là 10 ký tự
        if (phoneNumber.length <= 11) {
            // Cập nhật giá trị phone trong state
            setPhoneNumber(phoneNumber);
        }
    };
    useEffect(() => {
        setLoading(true);

        const getProfileUser = async () => {
            await axios({
                method: 'get',
                url: `http://localhost:8080/user/${idUserInfor}`,
            })
                .then((response) => {
                    setUserName(response.data.userName);
                    setEmail(response.data.email);
                    setPassword(response.data.password);
                    setIdentifyCard(response.data.identifyCard);
                    setBirthDate(response.data.birthDate);
                    setPhoneNumber(response.data.phoneNumber);
                })
                .catch((error) => {
                    console.error(error);
                });
        };
        getProfileUser();
        setLoading(false);
    }, []);

    const handleEditProfile = (e) => {
        e.preventDefault();

        axios
            .patch(`http://localhost:8080/user/${idUserInfor}`, {
                userName,
                email,
                password,
                identifyCard,
                birthDate,
                phoneNumber,
            })
            .then((response) => {
                alert('Chỉnh sửa thành công cho:' + email);
                //window.location.reload();
                navigate('/profile');
            })
            .catch((error) => {
                alert('Chỉnh sửa thất bại cho:' + email);

                console.log(error);
            });
    };

    return (
        <div className={cx('Profile-Edit')}>
            <form
                onSubmit={handleEditProfile}
                action=""
                className={cx('form', 'flex', 'flex-col', 'items-center', 'p-2')}
            >
                <h2 className={cx('text-center')}>Chỉnh sửa thông tin người dùng</h2>
                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="userName" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        Tên:
                    </label>
                    <input
                        required
                        type="text"
                        className={cx('form-control', 'lg:w-4/5', 'w-3/5', 'p-2', '')}
                        name="userName"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="email" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        Email:
                    </label>
                    <input
                        required
                        type="email"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="Password" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        Password:
                    </label>
                    <input
                        required
                        type="text"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="IdentifyCard" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        CMND/CCCD:
                    </label>
                    <input
                        type="text"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="IdentifyCard"
                        value={identifyCard}
                        onChange={(e) => setIdentifyCard(e.target.value)}
                        required
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="BirthDate" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        Ngày sinh:
                    </label>
                    <input
                        required
                        type="datetime-local"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5', 'break-words')}
                        name="BirthDate"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'self-start', 'w-full')}>
                    <label htmlFor="PhoneNumber" className={cx('w-2/5', 'lg:w-1/5', 'break-words', 'text-2xl')}>
                        SĐT:
                    </label>
                    <input
                        required
                        type="tel"
                        className={cx('form-control', '', 'p-2', 'lg:w-4/5', 'w-3/5')}
                        name="PhoneNumber"
                        value={phoneNumber}
                        onChange={handlePhoneNumber}
                        pattern="0[0-9]{9}" // Định dạng hiển thị theo chuẩn Việt Nam
                    />
                </div>

                <Button>Lưu</Button>
            </form>
        </div>
    );
}

ProfileEdit.propTypes = {};
export default React.memo(ProfileEdit);
