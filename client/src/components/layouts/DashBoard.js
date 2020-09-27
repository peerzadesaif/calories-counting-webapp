/* eslint-disable */
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import { useDispatch, useSelector } from 'react-redux';
import * as userActions from '../../store/actions/userActions';
import { Grid, Row, Column, } from 'carbon-components-react';
import cx from 'classnames';
import history from "../../store/history";





const DashBoard = () => {
    const dispatch = useDispatch();

    const handleOnLogout = () => {
        console.log('Logout')
        dispatch(userActions.logout());
    }
    return (

        <React.Fragment>
            DASHBOARD
        </React.Fragment>
    )
}

export default DashBoard
