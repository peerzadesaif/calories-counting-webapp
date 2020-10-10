
/* eslint-disable */
const type = require('../Types');

const initialState = {
    authToken: null,
    isUserLgged: false,
    userInfo: null,
    error: null,
    errorStatus: false,

    resetPassword: false,

    mealsItem: [],
    mealsError: null,
    mealsOnAddSuccess: false,
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
        case type.GET_MEALS_SUCCESS:
            Object.assign(state, state, { mealsItem: action.Records, })
            return {
                ...state,
                error: null,
                errorStatus: false,
                mealsItem: action.Records,
                mealsError: null,
                mealsOnAddSuccess: false,
            }
        case type.ADD_MEALS_SUCCESS:
            Object.assign(state, state, { mealsOnAddSuccess: true, })
            return {
                ...state,
                error: null,
                errorStatus: false,
                mealsError: null,
                mealsOnAddSuccess: true,
            }
        case type.ADD_MEALS_FAILURE:
            return {
                resetPassword: false,
                error: action.error,
                errorStatus: action.errorStatus,
                mealsError: action.error,
                mealsOnAddSuccess: false,
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
                mealsItem: [],
                mealsError: null,
                mealsOnAddSuccess: false,
            };
        default:
            return state;
    }
};