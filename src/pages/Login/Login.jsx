import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import Button from '~/components/Button';
import axios from 'axios';
import validator from 'validator';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [isRightLogIn, setIsRightLogIn] = useState(true);

    // useEffect(() => {
    //     setLoading(true);

    //     const getApiHome = async () => {
    //         const response = await getHome();
    //         setDataSlide(response.items[0].items);

    //         setDataList(response.items.filter((item) => item.sectionType === 'playlist'));

    //         setLoading(false);
    //         document.title = 'zing-mp3-clone';
    //     };
    //     getApiHome();
    // }, []);

    const handleLogin = (e) => {
        e.preventDefault();

        axios
            .post('http://localhost:8080/auth/login', { email, password })
            .then((response) => {
                if (response.data.access_token) {
                    localStorage.setItem('user', JSON.stringify(response.data.access_token));
                    navigate('/home');
                }
            })
            .catch((error) => {
                console.log(error);
                setIsRightLogIn(false);
            });

        // axios
        //     .get('http://localhost:8080/profile', {
        //         headers: {
        //             Authorization: `Bearer ${localStorage.getItem('user')}`,
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.error(error);
        //     });
    };

    return (
        <div className={cx('login', 'flex', 'flex-col', 'justify-center', 'items-center')}>
            <form
                onSubmit={handleLogin}
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
                        <span aria-hidden="true">W</span>
                        <span aria-hidden="true">E</span>
                        <span aria-hidden="true">L</span>
                        <span aria-hidden="true">C</span>
                        <span aria-hidden="true">O</span>
                        <span aria-hidden="true">M</span>
                        <span aria-hidden="true">E</span>
                        <span aria-hidden="true">!</span>
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
                    {!isRightLogIn ? <span className={cx('text-red-600')}>Mật khẩu hoặc email không đúng</span> : ''}
                </div>
                <div className={cx('form-group', 'self-center')}>
                    <Button className={cx('btn', 'rounded-md')}>LOG IN</Button>
                </div>
            </form>
        </div>
    );
};

export default memo(Login);
