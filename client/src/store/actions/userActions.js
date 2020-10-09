/* eslint-disable */
const type = require('../Types');
import history from '../history';
import UserServices from '../../apiServices/UserServices';

import * as alertActions from './alertActions';

import * as Cookies from "js-cookie";

export const logout = (payload) => async dispatch => {
    Cookies.remove("CLCNWAHASH")
    localStorage.clear();
    // USER LOG OUT SERVICE
    await dispatch({
        type: type.REMOVE_USER_SESSION,
        payload: {}
    });
    history.push('/login');
}

export const login = ({ email, password, ...rest }, from) => async dispatch => {
    try {
        const { data } = await UserServices.Login({ email, password, ...rest });
        console.log('data', data)
        if (data && data.status) {
            Cookies.set("CLCNWAHASH", data.data.token, { expires: 1 });
            history.push(from);
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                kind: 'success'
            }));
            dispatch({ type: type.LOGIN_SUCCESS, user: data.data.user })

        } else {
            dispatch({ type: type.LOGIN_FAILURE, error: data.message, errorStatus: true })
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                kind: 'error'
            }));
        }
    } catch (error) {
        console.error("error", error);
        dispatch({ type: type.LOGIN_FAILURE, error: 'Something Went Wrong', errorStatus: true })
        dispatch(alertActions.showToast({
            status: true,
            title: 'Something Went Wrong',
            kind: 'error'
        }));
    }
}

export const register = (payload) => async dispatch => {
    try {
        const { data } = await UserServices.Register(payload);
        if (data && data.status) {
            dispatch({ type: type.REGISTER_SUCCESS, user: data.user });
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                kind: 'success'
            }));
        } else {
            dispatch({ type: type.REGISTER_FAILURE, error: data.message, errorStatus: true });
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                kind: 'error'
            }));
        }
    } catch (error) {
        dispatch({ type: type.REGISTER_FAILURE, error: 'Something Went Wrong', errorStatus: true });
        dispatch(alertActions.showToast({
            status: true,
            title: 'Something Went Wrong',
            kind: 'error'
        }));
    }
}

export const resetPassword = (payload) => async dispatch => {

    try {
        const { data } = await UserServices.ResetPassword(payload);
        if (data && data.status) {
            dispatch({ type: type.RESET_PASSWORD_SUCCESS, });
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                subtitle: "Please login",
                kind: 'success'
            }));
            history.push('/login');
        } else {
            dispatch({ type: type.RESET_PASSWORD_FAILURE, error: data.message, errorStatus: true });
            dispatch(alertActions.showToast({
                status: true,
                title: data.message,
                kind: 'error'
            }));
        }
    } catch (error) {
        dispatch({ type: type.RESET_PASSWORD_FAILURE, error: 'Something Went Wrong', errorStatus: true });
        dispatch(alertActions.showToast({
            status: true,
            title: 'Something Went Wrong',
            kind: 'error'
        }));
    }
}