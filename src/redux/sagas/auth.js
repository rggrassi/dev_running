import { put, call } from 'redux-saga/effects'; 
import ActionCreators from '../actionCreators';
import jwtDecode from 'jwt-decode';

export const login = ({ api }) => function* (action) {
    
    const login = yield call(api.login, {
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

export const auth = ({ api }) => function* () {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            const user = yield call(api.getUser, 'me');
            yield put(ActionCreators.authSuccess(user.data));
        } catch(err) {
            yield put(ActionCreators.authFailure('invalid token'));
        }
    }
}

export const updateProfile = ({ api }) => function* (action) {
    yield call(api.updateUser, action.user)
    yield put(ActionCreators.updateProfileSuccess(action.user))
}

export const createProfile = ({ api }) => function* (action) {
    const user = yield call(api.createProfile, action.user);
    if (user.data.error) {
        yield put(ActionCreators.createProfileFailure(user.data.message));
    } else {
        yield put(ActionCreators.createProfileSuccess(action.user));
        yield put(ActionCreators.signinRequest(action.user.email, action.user.passwd));
    }
}