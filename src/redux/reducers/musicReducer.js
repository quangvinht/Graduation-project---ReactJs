import { actionType } from '../constants/musicTypes';

const initalState = {
    isShowSideBar: true,
    isRadioPlay: '',
    isSongPlay: '',
    isNavActive: '',
    isLoad: false,
    playLists: [
        // {
        //     encodeId: 'Z60D76BU',
        //     title: 'Có Duyên Không Phận',
        //     alias: 'Co-Duyen-Khong-Phan-M-Roy-JulianK-HOA-HONG-DAI-MUSIC',
        //     isOffical: true,
        //     username: '',
        //     artistsNames: 'M-Roy, JulianK, HOA HỒNG DẠI MUSIC',
        //     artists: [
        //         {
        //             id: 'IW77BDI0',
        //             name: 'M-Roy',
        //             link: '/nghe-si/M-Roy',
        //             spotlight: false,
        //             alias: 'M-Roy',
        //             thumbnail:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/b/a/9/0ba9fa347c6fd07e1b08b4c2559a14b3.jpg',
        //             thumbnailM:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/0/b/a/9/0ba9fa347c6fd07e1b08b4c2559a14b3.jpg',
        //             isOA: false,
        //             isOABrand: false,
        //             playlistId: '6BZB0UFF',
        //         },
        //         {
        //             id: 'IW6ZUDFO',
        //             name: 'JulianK',
        //             link: '/nghe-si/JulianK',
        //             spotlight: false,
        //             alias: 'JulianK',
        //             thumbnail:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/c/8/bbc8f318ed3518084691f4990e15a73b.jpg',
        //             thumbnailM:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/b/b/c/8/bbc8f318ed3518084691f4990e15a73b.jpg',
        //             isOA: false,
        //             isOABrand: false,
        //             playlistId: 'Z6BUIW08',
        //         },
        //         {
        //             id: 'IW76DFBF',
        //             name: 'HOA HỒNG DẠI MUSIC',
        //             link: '/HOA-HONG-DAI-MUSIC',
        //             spotlight: false,
        //             alias: 'HOA-HONG-DAI-MUSIC',
        //             thumbnail:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/7/7/a/e/77aee39bbfc521a33a81013048b839ae.jpg',
        //             thumbnailM:
        //                 'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/7/7/a/e/77aee39bbfc521a33a81013048b839ae.jpg',
        //             isOA: true,
        //             isOABrand: false,
        //         },
        //     ],
        //     isWorldWide: true,
        //     thumbnailM:
        //         'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/cover/d/0/7/5/d075fb56d99c43e8dd05a5c039586212.jpg',
        //     link: '/bai-hat/Co-Duyen-Khong-Phan-M-Roy-JulianK-HOA-HONG-DAI-MUSIC/Z60D76BU.html',
        //     thumbnail:
        //         'https://photo-resize-zmp3.zmdcdn.me/w94_r1x1_jpeg/cover/d/0/7/5/d075fb56d99c43e8dd05a5c039586212.jpg',
        //     duration: 232,
        //     zingChoice: false,
        //     isPrivate: false,
        //     preRelease: false,
        //     releaseDate: 1663300800,
        //     genreIds: ['IWZ9Z08I', 'IWZ97FCD'],
        //     album: {
        //         encodeId: '6BZB9WA9',
        //         title: 'Có Duyên Không Phận (Single)',
        //         thumbnail:
        //             'https://photo-resize-zmp3.zmdcdn.me/w165_r1x1_jpeg/cover/d/0/7/5/d075fb56d99c43e8dd05a5c039586212.jpg',
        //         isoffical: true,
        //         link: '/album/Co-Duyen-Khong-Phan-Single-M-Roy-JulianK/6BZB9WA9.html',
        //         isIndie: false,
        //         releaseDate: '16/09/2022',
        //         sortDescription: '',
        //         genreIds: ['IWZ9Z08I', 'IWZ97FCD'],
        //         PR: false,
        //         artists: [
        //             {
        //                 id: 'IW77BDI0',
        //                 name: 'M-Roy',
        //                 link: '/nghe-si/M-Roy',
        //                 spotlight: false,
        //                 alias: 'M-Roy',
        //                 thumbnail:
        //                     'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/0/b/a/9/0ba9fa347c6fd07e1b08b4c2559a14b3.jpg',
        //                 thumbnailM:
        //                     'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/0/b/a/9/0ba9fa347c6fd07e1b08b4c2559a14b3.jpg',
        //                 isOA: false,
        //                 isOABrand: false,
        //                 playlistId: '6BZB0UFF',
        //                 totalFollow: 54,
        //             },
        //             {
        //                 id: 'IW6ZUDFO',
        //                 name: 'JulianK',
        //                 link: '/nghe-si/JulianK',
        //                 spotlight: false,
        //                 alias: 'JulianK',
        //                 thumbnail:
        //                     'https://photo-resize-zmp3.zmdcdn.me/w240_r1x1_jpeg/avatars/b/b/c/8/bbc8f318ed3518084691f4990e15a73b.jpg',
        //                 thumbnailM:
        //                     'https://photo-resize-zmp3.zmdcdn.me/w360_r1x1_jpeg/avatars/b/b/c/8/bbc8f318ed3518084691f4990e15a73b.jpg',
        //                 isOA: false,
        //                 isOABrand: false,
        //                 playlistId: 'Z6BUIW08',
        //                 totalFollow: 25,
        //             },
        //         ],
        //         artistsNames: 'M-Roy, JulianK',
        //     },
        //     indicators: [],
        //     isIndie: false,
        //     streamingStatus: 1,
        //     allowAudioAds: true,
        //     hasLyric: true,
        //     rakingStatus: 4,
        //     releasedAt: 1663300800,
        // },
    ],
    currentIndex: 0,
    srcAudio: '',
    currentSong: '',
    notify: '',
    isDiskPlay: false,
    isLoop: false,
    isRandom: false,
    songInfor: [],
};

export const musicReducer = (state = initalState, { type, payload }) => {
    switch (type) {
        case actionType.SET_SHOW_SIDEBAR:
            return {
                ...state,
                isShowSideBar: payload,
            };
        case actionType.SET_RADIO_PLAY:
            return {
                ...state,
                isRadioPlay: payload,
            };
        case actionType.SET_SONG_PLAY:
            return {
                ...state,
                isSongPlay: payload,
            };
        case actionType.SET_PLAYLISTS:
            return {
                ...state,
                playLists: [...payload],
            };
        case actionType.SET_CURRENT_SONG:
            let playListID = state.playLists.map((playList) => playList.encodeId);
            return {
                ...state,
                currentSong: playListID[payload],
            };
        case actionType.SET_CURRENT_INDEX:
            return {
                ...state,

                currentIndex: payload,
            };
        case actionType.SET_SRC_AUDIO:
            return {
                ...state,
                srcAudio: payload,
            };
        case actionType.SET_IS_LOAD:
            return {
                ...state,
                isLoad: payload,
            };
        case actionType.SET_NOTIFY:
            return {
                ...state,
                notify: payload,
            };
        case actionType.SET_IS_PLAY:
            return {
                ...state,
                isDiskPlay: payload,
            };
        case actionType.SET_IS_LOOP:
            return {
                ...state,
                isLoop: payload,
            };
        case actionType.SET_IS_RANDOM:
            return {
                ...state,
                isRandom: payload,
            };
        case actionType.SET_SONG_INFOR:
            return {
                ...state,
                songInfor: payload,
            };

        default:
            return state;
    }
};
