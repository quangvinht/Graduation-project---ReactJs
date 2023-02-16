import { memo, useRef } from 'react';
import classNames from 'classnames/bind';
import styles from './RadioItem.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setRadioPlay } from '~/redux/actions/musicAction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function RadioItem({ data }) {
    const isRadioPlay = useSelector((state) => state.allMusics.isRadioPlay);

    const dispatch = useDispatch();
    let diskRef = useRef();

    const handleActiveRadio = () => {
        dispatch(setRadioPlay(data.id));
        if (diskRef.current.classList.contains('RadioItem_active__QGlKu')) {
            diskRef.current.classList.remove('RadioItem_active__QGlKu');
        } else {
            diskRef.current.classList.add('RadioItem_active__QGlKu');
        }
    };

    return (
        <div
            className={cx(
                'RadioItem',
                'w-full',
                'rounded-xl',
                'my-10',
                'sm:bg-none',
                'md:bg-none',
                'lg:flex',

                'lg:flex-col',
                'lg:items-end',
                'lg:justify-center',
            )}
            style={{ backgroundImage: `url(${data.thumbnailH})` }}
        >
            <div className={cx('disk-and-infor', 'flex', 'flex-col', 'mr-8', 'items-center', 'relative')}>
                <div
                    ref={diskRef}
                    onClick={() => {
                        handleActiveRadio();
                    }}
                    className={cx(
                        'disk',
                        'rounded-full',
                        'border-2',
                        'border-black',
                        'border-solid',
                        `${isRadioPlay === data.id ? 'active' : ''}`,
                    )}
                >
                    <img
                        src={data.thumbnailM}
                        alt=""
                        className={cx('img-M', 'h-full', 'object-cover', 'rounded-full')}
                    />

                    <div className={cx('live', 'bg-red-600', 'absolute', 'text-sm', 'font-bold', 'rounded-md')}>
                        Live
                    </div>
                </div>
                <FontAwesomeIcon icon={faPlay} className={cx('icon', 'absolute', 'rounded-full', 'text-4xl')} />
                <div className={cx('info', 'text-center')}>
                    <h2 className={cx('name')}>{data.title}</h2>
                    <p className={cx('listening')}>{data.activeUsers} Người đang nghe</p>
                </div>
            </div>
        </div>
    );
}

RadioItem.propTypes = {
    data: PropTypes.object.isRequired,
};
export default memo(RadioItem);
