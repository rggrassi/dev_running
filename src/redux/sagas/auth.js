import axios from 'axios';
import { put } from 'redux-saga/effects'; 
import ActionCreators from '../actionCreators';
import jwtDecode from 'jwt-decode';

export function* login(action) {
    
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

export function* destroyAuth() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    yield put(ActionCreators.destroyAuthSuccess());
}

export function* auth() {
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