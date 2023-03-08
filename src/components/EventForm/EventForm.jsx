import { useState, memo, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './EventForm.module.scss';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { editEvent } from '~/redux/actions/eventAction';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Button from '../Button';

const cx = classNames.bind(styles);

function EventForm({ data, className, onClick = false, onDoubleClick = false, disabled = false }) {
    const classes = cx('EventForm', {
        disabled,
        [className]: className,
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
            axios
                .patch(`http://localhost:8080/event/${idUpdate}`, { title, description, startDate, endDate, type })
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
                .post('http://localhost:8080/event', { title, description, startDate, endDate, type })
                .then((response) => {
                    alert('Thêm thành công:' + title);
                    window.location.reload();
                })
                .catch((error) => {
                    alert('Thêm thất bại:' + title);

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
                <Button className={cx('lg:w-1/2', 'w-1/2', 'md:w-3/5', 'self-center')}>
                    {isUpdate ? 'Chỉnh sửa ' : 'Thêm'}
                </Button>
            </form>
        </div>
    );
}

EventForm.propTypes = {};
export default memo(EventForm);