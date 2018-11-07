import axios from 'axios';
import { put } from 'redux-saga/effects'; 
import ActionCreators from '../actionCreators';

export function* getRuns() {
    const token = localStorage.getItem('token');
    const runs = yield axios.get('http://localhost:3001/runs', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    yield put(ActionCreators.getRunsSuccess(runs.data.data));
}

export function* createRun(action) {
    const token = localStorage.getItem('token');
    const run = yield axios.post('http://localhost:3001/runs', action.run, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    yield put(ActionCreators.createRunSuccess(run.data))
}

export function* removeRun(action) {
    const token = localStorage.getItem('token');
    yield axios.delete(`http://localhost:3001/runs/${action.id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    yield put(ActionCreators.removeRunSuccess(action.id))
}