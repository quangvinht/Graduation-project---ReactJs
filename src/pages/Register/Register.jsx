import { useEffect, useState, memo } from 'react';
import Button from '~/components/Button';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import validator from 'validator';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Register = () => {
    const [email, setEmail] = useState('');
    const [checkEmail, setCheckEmail] = useState('');

    const [password, setPassword] = useState('');

    const [checkPassword, setCheckPassword] = useState('');

    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [checkConfirmPass, setCheckConfirmPass] = useState('');

    const navigate = useNavigate();

    // const [userName, setUserName] = useState('');
    // const [checkName, setCheckName] = useState('');

    // const [identifyCard, setIdentifyCard] = useState('');
    // const [checkIdentifyCard, setCheckIdentifyCard] = useState('');

    // const [birthDate, setBirthDate] = useState('');
    // const [birthDateISO, setBirthDateISO] = useState('');

    // const [checkBirthDate, setCheckBirthDate] = useState('');

    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [checkPhoneNumber, setCheckPhoneNumber] = useState('');

    // const [imageFile, setImageFile] = useState(null);
    // const [avatarUrl, setAvatarUrl] = useState('');
    // const [checkAvatarUrl, setCheckAvatarUrl] = useState('');

    const handleImageChange = (e) => {
        e.preventDefault();

        //     const reader = new FileReader();
        //     const file = e.target.files[0];

        //     reader.onloadend = () => {
        //         setImageFile(file);
        //         setAvatarUrl(reader.result);
        //     };

        //     reader.readAsDataURL(file);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        //validate password:
        // if (validator.isEmpty(password)) {
        //     setCheckPassword('Không được bỏ trống');
        //     return;
        // } else if (!/[A-Z]/.test(password)) {
        //     setCheckPassword('Ít nhất có 1 kí tự hoa');
        //     return;
        // } else if (!/[a-z]/.test(password)) {
        //     setCheckPassword('Ít nhất có 1 kí tự thường');
        //     return;
        // } else if (password.length < 8) {
        //     setCheckPassword('Ít nhất có 8 kí tự');
        //     return;
        // } else {
        //     setCheckPassword('');
        // }

        //validate user name:
        // if (validator.isEmpty(userName)) {
        //     setCheckName('Không được bỏ trống');
        // } else {
        //     setCheckName('');
        // }

        //validate email:
        // if (validator.isEmpty(email)) {
        //     setCheckEmail('Không được bỏ trống');
        //     return;
        // } else if (!validator.isEmail(email)) {
        //     setCheckEmail('Nhập đúng dạng email');
        //     return;
        // } else {
        //     setCheckEmail('');
        // }

        //validate confirmed password:
        // if (validator.isEmpty(confirmedPassword)) {
        //     setCheckConfirmPass('Không được bỏ trống');
        //     return;
        // } else if (confirmedPassword !== password) {
        //     setCheckConfirmPass('Nhập lại mật khẩu không đúng');
        //     return;
        // } else {
        //     setCheckConfirmPass('');
        // }

        //validate identifycard:
        // if (validator.isEmpty(identifyCard)) {
        //     setCheckIdentifyCard('Không được bỏ trống');
        // } else {
        //     setCheckIdentifyCard('');
        // }

        //validate phone number:

        // if (validator.isEmpty(phoneNumber)) {
        //     setCheckPhoneNumber('Không được bỏ trống');
        // } else if (!validator.isNumeric(phoneNumber)) {
        //     setCheckPhoneNumber('Chỉ được nhập số');
        // } else {
        //     setCheckPhoneNumber('');
        // }

        //validate image:

        // if (validator.isEmpty(avatarUrl)) {
        //     setCheckAvatarUrl('Không được bỏ trống');
        // } else {
        //     setCheckAvatarUrl('');
        // }

        //validate birth date:
        //const isoDate = new Date(birthDate).toISOString();
        // setBirthDateISO(isoDate);
        //console.log(isoDate);
        //if (validator.isEmpty(birthDate)) {
        //    setCheckBirthDate('Không được bỏ trống');
        //} else {
        //  setCheckBirthDate('');
        // }
        const validatePassword = (password) => {
            const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
            return re.test(password);
        };

        if (validator.isEmpty(email) || validator.isEmpty(password) || validator.isEmpty(confirmedPassword)) {
            alert('Không được bỏ trống');
        } else if (!validator.isEmail(email)) {
            alert('Email không hợp lệ.');
            return;
        } else if (password !== confirmedPassword) {
            alert('Mật khẩu và nhập lại mật khẩu không trùng khớp.');
            return;
        } else if (!validatePassword(password)) {
            alert('Mật khẩu phải có ít nhất 8 ký tự và chứa ít nhất một chữ hoa, một chữ thường và một số.');
            return;
        }

        const createUser = async (email, password) => {
            try {
                const response = await axios.post('http://localhost:8080/user', {
                    email,
                    password,
                });

                alert('Đăng kí thành công');
                navigate('/');
            } catch (error) {
                alert('Email đã tồn tại');
                console.log(error);
            }
        };

        // const validateConfirmPassword = (password, confirmPassword) => {
        //     if (password !== confirmPassword) {
        //         setCheckConfirmPass('Mật khẩu và nhập lại mật khẩu không trùng khớp.');
        //     }
        //     if (confirmPassword === '') {
        //         setCheckConfirmPass('Không được bỏ trống.');
        //     }
        //     setConfirmedPassword('');
        // };

        // const validateEmail = (email) => {
        //     if (validator.isEmpty(email)) {
        //         setCheckEmail('Không được bỏ trống');
        //     }
        //     if (!validator.isEmail(email)) {
        //         setCheckEmail('Nhập đúng dạng email');
        //     }
        //     setCheckEmail('');
        // };
        // const validatePassword = (password) => {
        //     if (validator.isEmpty(password)) {
        //         setCheckPassword('Không được bỏ trống');
        //     } else if (!/[A-Z]/.test(password)) {
        //         setCheckPassword('Ít nhất có 1 kí tự hoa');
        //     } else if (!/[a-z]/.test(password)) {
        //         setCheckPassword('Ít nhất có 1 kí tự thường');
        //     } else if (password.length < 8) {
        //         setCheckPassword('Ít nhất có 8 kí tự');
        //     }
        //     setCheckPassword('');
        // };

        createUser(email, password);
    };

    return (
        <div className={cx('register', 'flex', 'flex-col', 'justify-center', 'items-center')}>
            <form
                onSubmit={handleRegister}
                action=""
                className={cx(
                    'form',
                    'flex',
                    'flex-col',
                    'md:w-2/3',
                    'lg:w-1/2',
                    'md:p-10',
                    'p-4',
                    'md:mt-32',
                    'lg:mt-10',
                )}
            >
                <div className={cx('self-center', 'wrapper', 'lg:text-xl', 'md:text-xs', 'text-sm')}>
                    <h1 className={cx('playful')} aria-label="Wash your hands">
                        <span aria-hidden="true">C</span>
                        <span aria-hidden="true">R</span>
                        <span aria-hidden="true">E</span>
                        <span aria-hidden="true">A</span>
                        <span aria-hidden="true">T</span>
                        <span aria-hidden="true">E</span>
                        <span aria-hidden="true"> </span>
                        <span aria-hidden="true">U</span>
                        <span aria-hidden="true">S</span>
                        <span aria-hidden="true">E</span>
                        <span aria-hidden="true">R</span>
                    </h1>
                </div>

                <div className={cx('form-group', 'flex', '', 'flex-col')}>
                    <label htmlFor="Email" className={cx('')}>
                        Email:
                    </label>
                    <input
                        type="text"
                        className={cx('form-control', '', 'p-2', '')}
                        name="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', '', 'flex-col')}>
                    <label htmlFor="Password" className={cx('', '')}>
                        Password:
                    </label>
                    <input
                        type="password"
                        className={cx('form-control', '', 'p-2', '')}
                        name="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', '', 'flex-col')}>
                    <label htmlFor="ConfirmedPassword" className={cx('', '')}>
                        Confirmed Password:
                    </label>
                    <input
                        type="password"
                        className={cx('form-control', '', 'p-2', '')}
                        name="ConfirmedPassword"
                        value={confirmedPassword}
                        onChange={(e) => setConfirmedPassword(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'self-center')}>
                    <Button className={cx('btn', 'rounded-md')}>REGISTER</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(Register);
