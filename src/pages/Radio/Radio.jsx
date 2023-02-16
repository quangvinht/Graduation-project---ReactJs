import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Radio.module.scss';
import getRadio from '~/services/Radio';
import Loading from '~/components/Loading';
import RadioItem from '~/components/RadioItem';

const cx = classNames.bind(styles);

function Radio() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        const getApiRadio = async () => {
            const response = await getRadio();

            setData(response.items[0].items);
            setLoading(false);
            document.title = 'Radio';
        };
        getApiRadio();
    }, []);

    return loading ? (
        <Loading />
    ) : (
        <div className={cx('Radio', 'flex', 'flex-col', 'mt-56', 'lg:mt-0', 'items-center')}>
            {data.map((item, i) => {
                return <RadioItem key={i} value={item.id} data={item} />;
            })}
        </div>
    );
}
export default memo(Radio);
