import { actionType } from '../constants/musicTypes';

export const setShowSidebar = (logic) => {
    return {
        type: actionType.SET_SHOW_SIDEBAR,
        payload: logic,
    };
};

export const setRadioPlay = (data) => {
    return {
        type: actionType.SET_RADIO_PLAY,
        payload: data,
    };
};

export const setSongPlay = (data) => {
    return {
        type: actionType.SET_SONG_PLAY,
        payload: data,
    };
};

export const setPlayLists = (data) => {
    return {
        type: actionType.SET_PLAYLISTS,
        payload: data,
    };
};
export const setCurrentIndex = (data) => {
    return {
        type: actionType.SET_CURRENT_INDEX,
        payload: data,
    };
};

export const setCurrentSong = (data) => {
    return {
        type: actionType.SET_CURRENT_SONG,
        payload: data,
    };
};
export const setSrcAudio = (data) => {
    return {
        type: actionType.SET_SRC_AUDIO,
        payload: data,
    };
};

export const setIsLoad = (data) => {
    return {
        type: actionType.SET_IS_LOAD,
        payload: data,
    };
};

export const setNotify = (data) => {
    return {
        type: actionType.SET_NOTIFY,
        payload: data,
    };
};
export const setDiskPlay = (data) => {
    return {
        type: actionType.SET_IS_PLAY,
        payload: data,
    };
};

export const setIsLoop = (data) => {
    return {
        type: actionType.SET_IS_LOOP,
        payload: data,
    };
};
export const setIsRandom = (data) => {
    return {
        type: actionType.SET_IS_RANDOM,
        payload: data,
    };
};

export const setSongInfor = (data) => {
    return {
        type: actionType.SET_SONG_INFOR,
        payload: data,
    };
};
