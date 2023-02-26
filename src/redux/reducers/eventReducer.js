import { actionType } from '../constants/eventTypes';

const initalState = {
    userInfor: [],
    idUpdateEvent: '',
    isUpdateEvent: false,
};

export const userReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case actionType.SET_USER:
            return {
                ...state,
                userInfor: payload,
            };
        case actionType.EDIT_EVENT:
            return {
                ...state,
                idUpdateEvent: payload,
                isUpdateEvent: true,
            };

        default:
            return state;
    }
};
