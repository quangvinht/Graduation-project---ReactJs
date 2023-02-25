import { combineReducers } from 'redux';
import { userReducer } from './userReducer.js';

const reducers = combineReducers({
    allUser: userReducer,
});
export default reducers;
