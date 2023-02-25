import { actionType } from '../constants/userTypes';

const initalState = {
    userInfor: [],
};

export const userReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case actionType.SET_USER:
            return {
                ...state,
                userInfor: payload,
            };

        default:
            return state;
    }
};
