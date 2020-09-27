
/* eslint-disable */
const type = require('../Types');

const initialState = {
    status: false,
    title: 'Saif',
    kind: 'info',
    subtitle: '',
    hideCloseButton: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case type.ON_SHOW_TOAST:
            return {
                ...state,
                ...action.payload,
            }
        case type.ON_HIDE_TOAST:
            return {
                status: false,
                title: '',
                kind: 'info',
                subtitle: '',
                hideCloseButton: false
            };
        default:
            return state;
    }
};