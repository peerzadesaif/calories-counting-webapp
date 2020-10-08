/* eslint-disable */
const type = require('../Types');
import history from '../history';

import * as alertActions from './alertActions';

import * as Cookies from "js-cookie";

export const logout = (payload) => async dispatch => {
    Cookies.remove("RCLOREHASH")
    localStorage.clear();
    // USER LOG OUT SERVICE
    await dispatch({
        type: type.REMOVE_USER_SESSION,
        payload: {}
    });
    history.push('/login');
}

export const login = ({ email, password, ...rest }, from) => async dispatch => {

}

export const register = (payload) => async dispatch => {

}

export const resetPassword = (payload) => async dispatch => {


}