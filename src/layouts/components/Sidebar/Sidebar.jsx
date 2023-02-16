import { useEffect, useState, useRef, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { setShowSidebar } from '~/redux/actions/musicAction';

import { useSelector, useDispatch } from 'react-redux';
import logo from '~/assets/images/logo.svg';
import logoMobile from '~/assets/images/logo-mobile.svg';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faChartSimple,
    faCompactDisc,
    faIcons,
    faMusic,
    faRadio,
    faStar,
    faXmark,
} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import config from '~/config';

const cx = classNames.bind(styles);

const linkNavbar = [
    {
        name: 'Khám Phá',
        to: config.routes.home,
        icon: <FontAwesomeIcon icon={faCompactDisc} />,
    },
    {
        name: 'Bảng Xếp Hạng',
        to: config.routes.chart,
        icon: <FontAwesomeIcon icon={faChartSimple} />,
    },
    {
        name: 'Radio',
        to: config.routes.radio,

        icon: <FontAwesomeIcon icon={faRadio} />,
    },
    {
        name: 'Nhạc Mới',
        to: config.routes.newMusic,

        icon: <FontAwesomeIcon icon={faMusic} />,
    },
    {
        name: 'Thể Loại',
        to: config.routes.category,

        icon: <FontAwesomeIcon icon={faIcons} />,
    },
    {
        name: 'Top 100',
        to: config.routes.top100,

        icon: <FontAwesomeIcon icon={faStar} />,
    },
];

function Sidebar({ className }) {
    const classes = [...className];
    let location = useLocation();

    const showSideBar = useSelector((state) => state.allMusics.isShowSideBar);
    const dispatch = useDispatch();

    const sideBarRef = useRef(null);

    const [windowDimenion, detectHW] = useState({
        winWidth: window.innerWidth,
        winHeight: window.innerHeight,
    });

    const detectSize = () => {
        detectHW({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
        });
    };

    useEffect(() => {
        window.addEventListener('resize', detectSize);

        return () => {
            window.removeEventListener('resize', detectSize);
        };
    }, [windowDimenion]);

    if (windowDimenion.winWidth >= 768) {
        dispatch(setShowSidebar(true));
    }

    return (
        <div
            ref={sideBarRef}
            className={cx(
                'Sidebar',
                classes,
                ['flex', 'flex-col', 'z-20', 'items-center', 'md:items-stretch'],
                `${showSideBar && 'show'}`,
            )}
        >
            <Link to={config.routes.home}>
                {windowDimenion.winWidth < 768 ? (
                    <img src={logoMobile} alt="" className={cx('logo-mobile', ['object-contain', 'my-5'])} />
                ) : (
                    <img src={logo} alt="" className={cx('logo', ['object-contain', 'md:py-8', 'px-8'])} />
                )}
            </Link>

            <div className={cx('navbar', ['flex', 'flex-col', 'pt-0', 'md:p-1'])}>
                {linkNavbar.map((link, index) => {
                    return (
                        <Link
                            to={link.to}
                            key={index}
                            className={cx('link', `${link.to === location.pathname ? 'active' : ''}`, ['px-6', 'py-2'])}
                        >
                            <span className={cx('icon', ['text-base', 'md:text-lg', 'mr-2'])}>{link.icon}</span>
                            <span className={cx('name', ['text-sm', 'md:text-sm'])}>{link.name}</span>
                        </Link>
                    );
                })}
            </div>
            <FontAwesomeIcon
                onClick={() => {
                    dispatch(setShowSidebar(false));
                }}
                icon={faXmark}
                className={cx('icon-close', ['md:hidden', 'fixed', 'top-3', 'right-3', 'text-3xl'])}
            />
        </div>
    );
}

Sidebar.propTypes = {
    className: PropTypes.array.isRequired,
};

export default memo(Sidebar);
