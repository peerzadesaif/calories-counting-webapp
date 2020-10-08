
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
        default:
            return state;
    }
};