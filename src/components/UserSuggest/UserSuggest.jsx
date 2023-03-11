import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './UserSuggest.module.scss';
import Select from 'react-select';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { addAndEditParticipant, addParticipant, editParticipant } from '~/redux/actions/eventAction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function UserSuggest({ isUpdated }) {
    const participants = useSelector((state) => state.allEvents.participants);
    const editParticipants = useSelector((state) => state.allEvents.editParticipants);
    const [selectedOption, setSelectedOption] = useState([]);
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        dispatch(addParticipant(selectedOption));
        dispatch(addAndEditParticipant([...selectedOption]));
    };

    useEffect(() => {
        setLoading(true);
        const getAPIEvent = async () => {
            await axios
                .get(`http://localhost:8080/user/all`)
                .then((response) => {
                    setOptions(
                        response.data.map((data) => {
                            return { label: data.email, value: data._id };
                        }),
                    );
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };

        getAPIEvent();
    }, []);

    const allParticipants = useSelector((state) =>
        state.allEvents.addAndEditParticipants.map((participant) => participant.label),
    );

    const labeladdAndEditParticipants = useSelector((state) => state.allEvents.addAndEditParticipants);

    //console.log(allParticipants);
    //console.log(editParticipants);

    useEffect(() => {
        dispatch(addAndEditParticipant([...selectedOption]));
    }, [editParticipants.length]);

    return (
        <div className={cx('User-Suggest')}>
            <Select
                //value={selectedOption}
                value={selectedOption}
                isMulti
                onChange={handleChange}
                options={
                    isUpdated
                        ? options
                              .filter((item) => !editParticipants.find((x) => x.label === item.label))
                              .concat(editParticipants.filter((item) => !options.find((x) => x.label === item.label)))
                        : options
                }
                className={cx('basic-multi-select', 'rounded')}
                classNamePrefix="select"
                closeMenuOnSelect={false}
            />

            {editParticipants.length > 0 && (
                <div>
                    <span className={cx('text-sm', 'font-bold')}>Đã tham gia:</span>
                    <div
                        className={cx(
                            'list-partipants-joined',
                            'flex',
                            'flex-wrap',
                            'gap-1',
                            'my-1',
                            'h-15',
                            'overflow-y-auto',
                        )}
                    >
                        {editParticipants.map((item) => {
                            return (
                                <span key={item.value} className={cx('email-participant', 'text-xs', 'py-1', 'px-1')}>
                                    {item.label}
                                    <FontAwesomeIcon
                                        className={cx('icon-x', 'mx-1')}
                                        icon={faTimes}
                                        onClick={() => {
                                            dispatch(editParticipant(editParticipants.filter((x) => x !== item)));
                                            //setSelectedOption([...selectedOption, item]);
                                        }}
                                    />
                                </span>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

UserSuggest.propTypes = {};
export default memo(UserSuggest);
