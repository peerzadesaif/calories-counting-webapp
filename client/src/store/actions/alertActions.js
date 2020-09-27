/* eslint-disable */
const type = require('../Types');

export const showToast = (payload) => async dispatch => {
    await dispatch({
        type: type.ON_SHOW_TOAST,
        payload,
    });
}

export const hideToast = (payload) => async dispatch => {
    await dispatch({
        type: type.ON_HIDE_TOAST,
        payload: {}
    });
}