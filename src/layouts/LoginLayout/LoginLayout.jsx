import classNames from 'classnames/bind';
import styles from './LoginLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Button from '~/components/Button';
import { useLocation, useNavigate } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import images from './../../assets/images/index';

const cx = classNames.bind(styles);

function LoginLayout({ children }) {
    const { pathname } = useLocation();
    const navigate = useNavigate();

    return (
        <>
            <div className={cx('wrapper', ['font-inter', 'h-screen'])}>
                <div className={cx('folder', ['grid', ''])}>
                    <header className={cx('header', ['flex', 'items-center', 'justify-between', 'p-4', 'h-30'])}>
                        <img
                            onClick={() => {
                                navigate('/');
                            }}
                            className={cx('image', [
                                'object-contain',
                                'object-center',
                                'w-32',
                                'h-3w-32',
                                'justify-center',
                                'items-center',
                            ])}
                            src={images.logo}
                            alt="logo"
                        />
                        <div>
                            {pathname === '/' ? (
                                <Button
                                    onClick={() => {
                                        navigate('/register');
                                    }}
                                    className={cx('btn', 'py-5', 'px-10', 'rounded-lg')}
                                >
                                    SIGN UP
                                </Button>
                            ) : (
                                <Button
                                    onClick={() => {
                                        navigate('/');
                                    }}
                                    className={cx('btn', 'py-5', 'px-10', 'rounded-lg')}
                                >
                                    LOG IN
                                </Button>
                            )}
                        </div>
                    </header>
                    <div className={cx('content', ['mt-12'])}>{children}</div>
                </div>
            </div>
        </>
    );
}

LoginLayout.prototypes = {
    children: PropTypes.node.isRequired,
};

export default LoginLayout;
