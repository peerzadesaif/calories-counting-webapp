
/* eslint-disable */
const type = require('../Types');

const initialState = {
    authToken: null,
    isUserLgged: false,
    userInfo: null,
    error: null,
    errorStatus: false,

    resetPassword: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.REGISTER_SUCCESS:
            return {
                ...state,
                error: null,
                errorStatus: false,
                // userInfo: action.user,
            }
        case type.REGISTER_FAILURE:
            return {
                error: action.error,
                errorStatus: action.errorStatus
            };
        case type.LOGIN_SUCCESS:
            return {
                ...state,
                isUserLgged: true,
                authToken: action.token,
                userInfo: action.user,
                error: null,
                errorStatus: false,
            }
        case type.LOGIN_FAILURE:
            return {
                error: action.error,
                errorStatus: action.errorStatus
            };
        case type.RESET_PASSWORD_SUCCESS:
            Object.assign(state, state, { resetPassword: true, })
            return {
                ...state,
                error: null,
                errorStatus: false,
            }
        case type.RESET_PASSWORD_FAILURE:
            return {
                resetPassword: false,
                error: action.error,
                errorStatus: action.errorStatus
            };
        case type.REMOVE_USER_SESSION:
            // console.log("Here>>")
            return {
                ...state,
                authToken: null,
                isUserLgged: false,
                userInfo: null,
                resetPassword: false,
                errorStatus: false,
            };
        default:
            return state;
    }
};