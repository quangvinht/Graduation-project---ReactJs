import { useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';
import { useDebounce } from '~/hooks';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLocation, useNavigate } from 'react-router-dom';
import { faCircleXmark, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function Search() {
    let location = useLocation();
    const navigate = useNavigate();

    //2way binding cho ô tìm kiếm:
    const [searchValue, setSearchValue] = useState('');

    const debounces = useDebounce(searchValue, 500);
    const handleClear = () => {
        setSearchValue('');
    };
    return (
        <div
            className={cx('Search', [
                // 'flex-1',
                'flex',
                'my-10',
                'relative',
                // 'items-center',
                'md:mx-32',
                'rounded-3xl',
                'overflow-hidden',
                'mr-8',
                'md:w-3/5',
                'w-5/6',
            ])}
        >
            <input
                type="text"
                value={searchValue}
                onChange={(e) => {
                    setSearchValue(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.keyCode === 13) {
                        navigate(debounces.trim().length === 0 ? location.pathname : `/search/${debounces.trim()}`);
                    }
                }}
                placeholder="Nhập tên bài hát, nghệ sĩ hoặc MV..."
                className={cx('input-item', ['flex-1', 'py-3', 'pl-5', 'pr-5', 'text-white'])}
            />
            {searchValue && (
                <button onClick={handleClear} className={cx('button-close', ['py-3', 'px-5'])}>
                    <FontAwesomeIcon icon={faCircleXmark} className={cx('icon-close', 'text-sm')} />
                </button>
            )}

            <button
                onClick={() => {
                    navigate(debounces.trim().length === 0 ? location.pathname : `/search/${debounces.trim()}`);
                }}
                className={cx('button-search', ['py-3', 'md:px-5', 'px-3', 'flex', 'justify-center', 'items-center'])}
            >
                <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('icon-search', 'text-2xl')} />
            </button>
        </div>
    );
}

export default memo(Search);
