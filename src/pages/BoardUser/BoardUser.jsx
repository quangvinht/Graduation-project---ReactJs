import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './BoardUser.module.scss';

const cx = classNames.bind(styles);

const BoardUser = () => {
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

    return <div className={cx('board-user', 'flex', 'flex-col')}>This is BoardUser</div>;
};

export default memo(BoardUser);
