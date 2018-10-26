import { combineReducers } from 'redux';
import auth from './auth';
import runs from './runs'

export default combineReducers({
    auth,
    runs
})