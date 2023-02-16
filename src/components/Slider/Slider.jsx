import React from 'react';
import classNames from 'classnames/bind';
import styles from './Slider.module.scss';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';

// import required modules
import { Navigation, Autoplay } from 'swiper';

const cx = classNames.bind(styles);

function Slider({ dataSlide }) {
    const navigate = useNavigate();
    return (
        <div className={cx('slider', '')}>
            <Swiper
                spaceBetween={20}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                navigation={true}
                pagination={{ clickable: true }}
                modules={[Navigation, Autoplay]}
                observer={true}
                observeParents={true}
                parallax={true}
                className="mySwiper flex"
                breakpoints={{
                    640: {
                        width: 640,
                        slidesPerView: 1,
                    },
                    // when window width is >= 640px
                    768: {
                        width: 768,
                        slidesPerView: 2,
                    },
                    // when window width is >= 768px
                    1024: {
                        width: 1024,
                        slidesPerView: 3,
                    },
                }}
                loopFillGroupWithBlank={true}
            >
                {dataSlide.map((item, i) => {
                    return (
                        <div key={i}>
                            <SwiperSlide
                                onClick={() => {
                                    if (item.type === 4) {
                                        navigate(`${item.link.replace('.html', '')}`);
                                    }
                                }}
                            >
                                <img
                                    src={item.banner}
                                    alt=""
                                    className={cx('slider-item', 'object-cover', 'rounded-xl')}
                                />
                            </SwiperSlide>
                        </div>
                    );
                })}
            </Swiper>
        </div>
    );
}

Slider.propTypes = {
    dataSlide: PropTypes.array.isRequired,
};
export default React.memo(Slider);
