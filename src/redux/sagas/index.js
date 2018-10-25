import { takeLatest, all, put } from 'redux-saga/effects';
import { Types } from '../actionCreators';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import ActionCreators from '../actionCreators';

function* login(action) {
    
    const login = yield axios.post('http://localhost:3001/users/login', {
        email: action.email, 
        passwd: action.passwd
    });

    if (login.data.token) {
        const token = login.data.token;
        localStorage.setItem('token', token);

        const user = jwtDecode(token);
        localStorage.setItem('user', user); 

        yield put(ActionCreators.signinSuccess(user));
    } else {
        yield put(ActionCreators.signinFailure(login.data.message))
    }
}

function* auth() {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const user = jwtDecode(token);
            yield put(ActionCreators.authSuccess(user))
        } catch(err) {
            yield put(ActionCreators.authFailure('invalid token'))
        }
    }
}

export default function* rootSaga() {
    yield all([
        takeLatest(Types.SIGNIN_REQUEST, login),
        takeLatest(Types.AUTH_REQUEST, auth),
        put(ActionCreators.authRequest())
    ])    
}