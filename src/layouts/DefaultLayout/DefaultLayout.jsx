import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';
import Header from '~/layouts/components/Header/Header';
import Sidebar from '~/layouts/components/Sidebar/Sidebar';
import Player from '~/layouts/components/Player/Player';

import PropTypes from 'prop-types';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cx = classNames.bind(styles);

function DefaultLayout({ children }) {
    return (
        <>
            <div className={cx('wrapper', ['grid', 'grid-cols-6', 'font-inter', 'h-screen'])}>
                <Sidebar className={['col-span-1', 'md:col-span-1', 'fixed', 'top-0', 'bottom-0', 'left-0', '']} />
                <div
                    className={cx('container', [
                        'col-span-5',
                        'md:col-span-5',
                        'flex',
                        'flex-col',
                        'ml-5',
                        'md:ml-48',
                        'lg:ml-64',

                        // 'mb-96',
                    ])}
                >
                    <Header />
                    <div className={cx('content', ['mb-56', 'lg:mx-24', 'md:mx-32', 'mx-8', 'mt-32'])}>{children}</div>
                </div>
                <Player className={['fixed']} />
            </div>
            <ToastContainer newestOnTop limit={3} />
        </>
    );
}

DefaultLayout.prototypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout;
