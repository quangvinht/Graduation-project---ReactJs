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

export const addParticipant = (data) => {
    return {
        type: actionType.ADD_PARTICIPANT,
        payload: data,
    };
};
export const editParticipant = (data) => {
    return {
        type: actionType.EDIT_PARTICIPANT,
        payload: data,
    };
};

export const addAndEditParticipant = (data) => {
    return {
        type: actionType.ADD_EDIT_PARTICIPANT,
        payload: data,
    };
};

export const setProfile = (data) => {
    return {
        type: actionType.SET_PROFILE,
        payload: data,
    };
};
