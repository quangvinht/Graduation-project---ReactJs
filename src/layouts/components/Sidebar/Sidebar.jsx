import React from 'react';
import classNames from 'classnames/bind';
import styles from './SideBar.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import MenuList from '~/components/MenuList';
import MenuItem from '~/components/MenuList/MenuItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDays } from '@fortawesome/free-regular-svg-icons';
import { faUserGear } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function SideBar() {
    //const showSideBar = useSelector((state) => state.allMusics.isShowSideBar);
    //const dispatch = useDispatch();

    return (
        <div className={cx('side-bar')}>
            <MenuList>
                <MenuItem to={'/board-events'}>
                    <FontAwesomeIcon icon={faCalendarDays} />
                    <span className={cx('ml-1')}> Phong trào / Sự kiện</span>
                </MenuItem>
                <MenuItem to={'/board-users'}>
                    <FontAwesomeIcon icon={faUserGear} />
                    <span className={cx('ml-1')}> Người dùng</span>
                </MenuItem>
            </MenuList>
        </div>
    );
}

export default React.memo(SideBar);
