import React from 'react';
import classNames from 'classnames/bind';
import styles from './Button.module.scss';

const cx = classNames.bind(styles);

function Button({ children, className, outline = false, onClick = false, stroke = false }) {
    const classes = cx('Button', {
        outline,
        stroke,
        [className]: className,
    });

    return (
        <button
            onClick={() => {
                onClick && onClick();
            }}
            className={cx(classes, 'text-base', 'text-center')}
        >
            {children}
        </button>
    );
}

Button.propTypes = {};
export default React.memo(Button);
