import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { setShowSidebar } from '~/redux/actions/musicAction';

import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import Search from '~/components/Search';

const cx = classNames.bind(styles);

function Header() {
    const showSideBar = useSelector((state) => state.allMusics.isShowSideBar);
    const dispatch = useDispatch();

    return (
        <div
            className={cx('header', [
                'flex',
                'items-center',
                'justify-center',
                'z-10',
                'fixed',
                'top-0',
                'right-0',
                'left-0',
                'lg:left-28',
                'md:left-40',
                'md:mx-0',
                'mx-12',
            ])}
        >
            <FontAwesomeIcon
                onClick={() => {
                    dispatch(setShowSidebar(!showSideBar));
                }}
                icon={faBars}
                className={cx('icon-bar', ['md:hidden', 'px-5'])}
            />

            <Search />
        </div>
    );
}

export default React.memo(Header);
