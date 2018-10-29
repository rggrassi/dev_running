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

    getRunsRequest: null,
    getRunsSuccess: ['runs'],
    getRunsFailure: null,

    createRunRequest: ['run'],
    createRunSuccess: ['run'],
    createRunFailure: ['error'],

    destroyAuthRequest: null,
    destroyAuthSuccess: null,

    updateProfileRequest: ['user'],
    updateProfileSuccess: ['user'],
    updateProfileFailure: ['error'],
    updateProfileReset: null,
})

export default Creators