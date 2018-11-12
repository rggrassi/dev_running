import { put, call } from 'redux-saga/effects'; 
import ActionCreators from '../actionCreators';

export const getRuns = ({ api }) => function* (action) {
    const filter = action.admin ? '?admin=true' : '';
    const runs = yield call(api.getRuns, filter); 
    yield put(ActionCreators.getRunsSuccess(runs.data.data));
}

export const createRun = ({ api }) => function* (action) {
    const run = yield call(api.createRun, action.run); 
    yield put(ActionCreators.createRunSuccess(run.data));
}

export const removeRun = ({ api }) => function* (action) {
    yield call(api.removeRun, action.id);
    yield put(ActionCreators.removeRunSuccess(action.id));
}