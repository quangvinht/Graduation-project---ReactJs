import { useEffect, useState, memo } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import userService from '~/services/userService';
import axios from 'axios';
import { getUserInfor } from '~/redux/actions/eventAction';

import { useDispatch, useSelector } from 'react-redux';

const cx = classNames.bind(styles);

const Home = () => {
    const [loading, setLoading] = useState(false);

    //const user = useSelector((state) => state.allUser.userInfor);
    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);

        const getAPIIdUser = async () => {
            await axios
                .get('http://localhost:8080/profile', {
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user'))}`,
                    },
                })
                .then((response) => {
                    axios({
                        method: 'get',
                        url: `http://localhost:8080/user/${response.data.sub}`,
                    }).then(function (response) {
                        dispatch(getUserInfor(response.data));
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
            setLoading(false);
        };

        getAPIIdUser();
    }, []);

    return <div className={cx('home', 'flex', 'flex-col')}></div>;
};

export default memo(Home);
