import { combineReducers } from 'redux';
import auth from './auth';
import runs from './runs';
import users from './users';

export default combineReducers({
    auth,
    runs,
    users
})