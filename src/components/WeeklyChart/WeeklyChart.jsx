import React from 'react';
import classNames from 'classnames/bind';
import styles from './WeeklyChart.module.scss';
import WeeklyChartItem from './WeeklyChartItem';

import PropTypes from 'prop-types';

const cx = classNames.bind(styles);

function WeeklyChart({ areas, onClick }) {
    return (
        <div
            onClick={() => {
                onClick && onClick();
            }}
            className={cx('weekly-chart', 'grid', 'lg:grid-cols-3', 'grid-cols-1', 'gap-6', 'flex')}
        >
            {areas.map((area, i) => {
                let region = '';
                if (area.country === 'vn') {
                    region = 'Việt Nam';
                } else if (area.country === 'us') {
                    region = 'US-UK';
                } else {
                    region = 'K-Pop';
                }

                return <WeeklyChartItem key={i} region={region} area={area} />;
            })}
        </div>
    );
}

WeeklyChart.propTypes = {
    areas: PropTypes.array.isRequired,
};
export default React.memo(WeeklyChart);
