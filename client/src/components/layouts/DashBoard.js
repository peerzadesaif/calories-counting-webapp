/* eslint-disable */
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/userActions';

const DashBoard = () => {
    const dispatch = useDispatch();

    const handleOnLogout = () => {
        dispatch(userActions.logout());
    }
    return (
        <div>
            <h1>WELCOME TO DASHBOARD</h1>
        </div>
    )
}

export default DashBoard
