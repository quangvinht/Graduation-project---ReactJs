import { combineReducers } from 'redux';
import { musicReducer } from './musicReducer.js';

const reducers = combineReducers({
    allMusics: musicReducer,
});
export default reducers;
