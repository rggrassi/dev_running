import { put, call } from 'redux-saga/effects'; 
import ActionCreators from '../actionCreators';

export const getUsers = ({ api }) => function* (action) {
    const users = yield call(api.getUsers)
    yield put(ActionCreators.getUsersSuccess(users.data));
}

export const getUser = ({ api }) => function* (action) {
    const user = yield call(api.getUser, action.id);
    yield put(ActionCreators.getUserSuccess(user.data));
}

export const removeUser = ({ api }) => function* (action) {
    yield call(api.removeUser, action.id)
    yield put(ActionCreators.removeUserSuccess(action.id))
}

export const updateUser = ({ api }) => function* (action) {
    yield call(api.updateUser, action.user)
    yield put(ActionCreators.updateUserSuccess(action.user))
    yield put(ActionCreators.updateUserReset())
}