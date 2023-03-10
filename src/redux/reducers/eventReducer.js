import { actionType } from '../constants/eventTypes';

const initalState = {
    userInfor: [],
    idUpdateEvent: '',
    isUpdateEvent: false,
    participants: [],
    editParticipants: [],
    addAndEditParticipants: [],
    profile: [],
};

export const userReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case actionType.SET_USER:
            return {
                ...state,
                userInfor: payload,
            };
        case actionType.SET_PROFILE:
            return {
                ...state,
                profile: payload,
            };
        case actionType.EDIT_EVENT:
            return {
                ...state,
                idUpdateEvent: payload,
                isUpdateEvent: true,
            };

        case actionType.ADD_PARTICIPANT:
            return {
                ...state,
                participants: payload,
            };
        case actionType.EDIT_PARTICIPANT:
            return {
                ...state,
                editParticipants: [...initalState.editParticipants, ...payload],
            };
        case actionType.ADD_EDIT_PARTICIPANT:
            return {
                ...state,
                addAndEditParticipants: [
                    ...initalState.addAndEditParticipants,
                    ...payload,
                    ...initalState.editParticipants,
                ],
            };

        default:
            return state;
    }
};
