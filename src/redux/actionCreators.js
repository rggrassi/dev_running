import { createActions } from 'reduxsauce';

export const {
    Types,
    Creators
} = createActions({
    signinRequest: ['email', 'passwd'],
    signinSuccess: ['user'],
    signinFailure: ['error'],

    authRequest: null,
    authSuccess: ['user'],
    authFailure: null,

    getRunsRequest: ['admin'],
    getRunsSuccess: ['runs'],
    getRunsFailure: null,
    
    createRunReset: null,
    createRunRequest: ['run'],
    createRunSuccess: ['run'],
    createRunFailure: ['error'],

    getUsersRequest: null,
    getUsersSuccess: ['users'],
    getUsersFailure: null,

    getUserRequest: ['id'],
    getUserSuccess: ['user'],
    getUserFailure: null,

    removeUserRequest: ['id'],
    removeUserSuccess: ['id'],
    removeUserFailure: ['error'],

    updateUserReset: null,
    updateUserRequest: ['user'],
    updateUserSuccess: ['user'],
    updateUserFailure: ['error'],

    removeRunRequest: ['id'],
    removeRunSuccess: ['id'],
    removeRunFailure: ['error'],

    destroyAuthRequest: null,
    destroyAuthSuccess: null,

    updateProfileReset: null,
    updateProfileRequest: ['user'],
    updateProfileSuccess: ['user'],
    updateProfileFailure: ['error'],
    
    createProfileReset: null,
    createProfileRequest: ['user'],
    createProfileSuccess: ['user'],
    createProfileFailure: ['error']
})

export default Creators