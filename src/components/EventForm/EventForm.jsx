import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EventForm.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editEvent, editParticipant, addAndEditParticipant } from '~/redux/actions/eventAction';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '../Button';
import UserSuggest from '../UserSuggest';
import { CSVLink, CSVDownload } from 'react-csv';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExport } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

function EventForm({ data, className, onClick = false, onDoubleClick = false, disabled = false }) {
    const classes = cx('EventForm', {
        disabled,
        [className]: className,
    });

    // thêm thành viên

    const participants = useSelector((state) => state.allEvents.participants.map((participant) => participant.value));

    const addAndEditParticipants = useSelector((state) =>
        state.allEvents.addAndEditParticipants.map((participant) => participant.value),
    );

    const editParticipants = useSelector((state) =>
        state.allEvents.editParticipants.map((participant) => participant.value),
    );

    const addAndEditParticipantsLabel = useSelector((state) =>
        state.allEvents.addAndEditParticipants.map((participant) => participant.label),
    );

    const editParticipantsLabel = useSelector((state) =>
        state.allEvents.editParticipants.map((participant) => participant.label),
    );

    const csvData = [...addAndEditParticipantsLabel, ...editParticipantsLabel].map((item) => {
        return { email: item };
    });

    const options = ['ưu tiên', 'bình thường', 'quan trọng'];
    const defaultOption = options[0];
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [type, setType] = useState(defaultOption);

    const idUpdate = useSelector((state) => state.allEvents.idUpdateEvent);
    const isUpdate = useSelector((state) => state.allEvents.isUpdateEvent);
    const [loading, setLoading] = useState(false);

    // const participantUpdate = [...participants, ...editParticipants];

    const dispatch = useDispatch();

    useEffect(() => {
        setLoading(true);

        const getAPIEvent = async () => {
            await axios
                .get(`http://localhost:8080/event/${idUpdate}`, {})
                .then((response) => {
                    if (isUpdate) {
                        setTitle(response.data.title);
                        setDescription(response.data.description);
                        setStartDate(response.data.startDate);
                        setEndDate(response.data.endDate);
                        setType(response.data.type);
                        // dispatch(
                        //     editParticipant(
                        //         response.data.participants.map((participant) => {
                        //             return { label: participant.email, value: participant._id };
                        //         }),
                        //     ),
                        // );
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
            setLoading(false);
        };

        getAPIEvent();
    }, [idUpdate]);

    const handleEventForm = (e) => {
        e.preventDefault();
        if (isUpdate) {
            // dispatch(addAndEditParticipant([...editParticipants]));

            if (participants.length > 0) {
                axios
                    .patch(`http://localhost:8080/event/${idUpdate}`, {
                        title,
                        description,
                        startDate,
                        endDate,
                        type,
                        participants: [...addAndEditParticipants, ...editParticipants],
                    })
                    .then((response) => {
                        alert('Chỉnh sửa thành công:' + title);
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert('Chỉnh sửa thất bại:' + title);

                        console.log(error);
                    });
            } else {
                axios
                    .patch(`http://localhost:8080/event/${idUpdate}`, {
                        title,
                        description,
                        startDate,
                        endDate,
                        type,
                        participants: [...addAndEditParticipants, ...editParticipants],
                    })
                    .then((response) => {
                        alert('Chỉnh sửa thành công: ' + title);
                        window.location.reload();
                    })
                    .catch((error) => {
                        alert('Chỉnh sửa thất bại:' + title);

                        console.log(error);
                    });
            }
        } else {
            axios
                .post('http://localhost:8080/event', { title, description, startDate, endDate, type, participants })
                .then((response) => {
                    alert('Thêm thành công: ' + title);
                    window.location.reload();
                })
                .catch((error) => {
                    alert('Thêm thất bại: ' + title);

                    console.log(error);
                });
        }
    };

    return (
        <div
            className={cx('event-form', classes, 'flex', 'flex-col')}
            onClick={() => {
                onClick && onClick();
            }}
        >
            <h4 className={cx('text-center')}>{isUpdate ? 'Chỉnh sửa sự kiện' : 'Thêm sự kiện'}</h4>
            <form onSubmit={handleEventForm} action="" className={cx('form-event', 'flex', 'flex-col', 'gap-3')}>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="title" className={cx('')}>
                        Title:
                    </label>
                    <input
                        type="text"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3', '')}
                        name="title"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="description" className={cx('')}>
                        Description:
                    </label>
                    <input
                        type="text"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3')}
                        name="description"
                        placeholder="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="startDate" className={cx('')}>
                        start Date:
                    </label>
                    <input
                        type="datetime-local"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3')}
                        name="startDate"
                        placeholder="start Date"
                        value={startDate}
                        max={endDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>

                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="endDate" className={cx('')}>
                        End Date:
                    </label>
                    <input
                        type="datetime-local"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3')}
                        name="endDate"
                        placeholder="end Date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="type" className={cx('')}>
                        Thành viên:
                    </label>

                    <UserSuggest isUpdated={isUpdate} />
                </div>
                <div className={cx('form-group', 'flex', 'flex-col', 'gap-1')}>
                    <label htmlFor="type" className={cx('')}>
                        Type:
                    </label>
                    {/* <input
                        type="dropdown"
                        className={cx('form-control', 'flex-2', 'p-2', 'ml-3')}
                        name="type"
                        placeholder="Type"
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                    /> */}
                    <Dropdown
                        options={options}
                        onChange={(e) => {
                            setType(e.value);
                        }}
                        value={defaultOption}
                        placeholder="Select an option"
                    />
                </div>

                <div className="flex justify-center items-center gap-1">
                    <Button className={cx('lg:w-1/2', 'w-1/2', 'md:w-3/5', 'self-center')}>
                        {isUpdate ? 'Chỉnh sửa ' : 'Thêm'}
                    </Button>

                    <div>
                        {csvData.length > 0 && (
                            <CSVLink className={cx('csv')} data={csvData} filename={'danh_sách_thành_viên.csv'}>
                                <FontAwesomeIcon icon={faFileExport} />
                            </CSVLink>
                        )}
                    </div>
                </div>
            </form>
        </div>
    );
}

EventForm.propTypes = {};
export default memo(EventForm);
