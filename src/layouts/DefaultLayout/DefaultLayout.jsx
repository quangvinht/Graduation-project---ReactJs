import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import { useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SideBar from '../components/SideBar';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    const { pathname } = useLocation();
    return (
        <>
            <div className={cx('wrapper', ['font-inter', 'h-screen'])}>
                <div className={cx('folder', ['flex', 'flex-col'])}>
                    <Header />
                    {!(pathname === '/' || pathname === '/register') && <SideBar />}

                    <div className={cx('content', 'mx-14')}>{children}</div>
                </div>
            </div>
        </>
    );
}

DefaultLayout.prototypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
