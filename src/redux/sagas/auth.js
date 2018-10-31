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
            const user = yield axios.get('http://localhost:3001/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            yield put(ActionCreators.authSuccess(user.data))
        } catch(err) {
            yield put(ActionCreators.authFailure('invalid token'))
        }
    }
}

export function* updateProfile(action) {
    const token = localStorage.getItem('token');
    const userToSave = {
        ...action.user
    }
    yield axios.patch(`http://localhost:3001/users/${action.user.id}`, userToSave, {
        headers: {
            Authorization: `Bearer ${token}`
        }    
    })
    yield put(ActionCreators.updateProfileSuccess(userToSave))
}

export function* createProfile(action) {
    const user = yield axios.post('http://localhost:3001/users', action.user);
    if (user.data.error) {
        yield put(ActionCreators.createProfileFailure(user.data.message));
    } else {
        yield put(ActionCreators.createProfileSuccess(action.user));
        yield put(ActionCreators.signinRequest(action.user.email, action.user.passwd));
    }
}