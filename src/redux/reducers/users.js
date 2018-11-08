import { createReducer } from 'reduxsauce';
import { Types } from '../actionCreators';

export const INITIAL_STATE = {
    isLoading: false,
    data: [],
    saved: false,
    isSaving: false,
    user: {}
}

export const getUsersRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true,
    }
}

export const getUsersSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        data: action.users
    }
}

export const getUsersFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}

export const getUserRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: true,
        user: action.user
    }
}

export const getUserSuccess = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false,
        user: action.user
    }
}

export const getUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isLoading: false
    }
}

export const removeUserRequest = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: true,        
    }
}

export const removeUserSuccess = (state = INITIAL_STATE, action) => {
    const runs = [...state.data];
    const idx = runs.findIndex(run => run.id === action.id);
    runs.splice(idx, 1);
    return {
        ...state,
        isSaving: false,
        data: runs
    }
}

export const removeUserFailure = (state = INITIAL_STATE, action) => {
    return {
        ...state,
        isSaving: false
    }
}

export const HANDLERS = {
    [Types.GET_USERS_REQUEST]: getUsersRequest,
    [Types.GET_USERS_SUCCESS]: getUsersSuccess,
    [Types.GET_USERS_FAILURE]: getUsersFailure,
    [Types.GET_USER_REQUEST]: getUserRequest,
    [Types.GET_USER_SUCCESS]: getUserSuccess,
    [Types.GET_USER_FAILURE]: getUserFailure,
    [Types.REMOVE_USER_REQUEST]: removeUserRequest,
    [Types.REMOVE_USER_SUCCESS]: removeUserSuccess,
    [Types.REMOVE_USER_FAILURE]: removeUserFailure,
}

export default createReducer(INITIAL_STATE, HANDLERS);