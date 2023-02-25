import { actionType } from '../constants/userTypes';

export const getUserInfor = (data) => {
    return {
        type: actionType.SET_USER,
        payload: data,
    };
};
