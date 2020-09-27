/* eslint-disable */
import React from 'react';
import * as Cookies from "js-cookie";
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
    return (
        <Route {...rest} render={props => {
            if (!Cookies.get("RCLOREHASH")) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }
            // logged in so return component
            return <Component {...props} />
        }} />
    );
}

export default PrivateRoute;