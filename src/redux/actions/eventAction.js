import { actionType } from '../constants/eventTypes';

export const getUserInfor = (data) => {
    return {
        type: actionType.SET_USER,
        payload: data,
    };
};
export const editEvent = (data) => {
    return {
        type: actionType.EDIT_EVENT,
        payload: data,
    };
};
