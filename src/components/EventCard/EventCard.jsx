import React from 'react';
import classNames from 'classnames/bind';
import styles from './EventCard.module.scss';

const cx = classNames.bind(styles);

function EventCard({ data, className, onClick = false }) {
    const classes = cx('EventCard', {
        [className]: className,
    });

    return (
        <div
            key={data._id}
            className={cx(
                'event-card',

                'w-full',
                'flex',
                'flex-col',
                'py-4',
                'px-5',
                'text-base',
                'mb-3',
                classes,
            )}
        >
            <span className={cx('title')}>{data.title}</span>
            <span className={cx('description')}>{data.description}</span>
            <div className={cx('date', 'self-start')}>
                <span className={cx('start-date')}>{data.startDate}</span> ||
                <span className={cx('end-date')}>{data.endDate}</span>
            </div>
            <div className={cx('type', '', '')}>
                {data.type === 'quan trọng' && <div className={cx('dot', '', '', '')}></div>}
                <span className={cx('ml-2')}>{data.type}</span>
            </div>
        </div>
    );
}

EventCard.propTypes = {};
export default React.memo(EventCard);
