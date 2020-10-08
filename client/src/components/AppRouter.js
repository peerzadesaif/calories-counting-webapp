/* eslint-disable */
import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute"
import LoginPage from "./layouts/LoginPage";
import DashBoard from "./layouts/DashBoard";
import RegisterPage from "./layouts/RegisterPage";
import ForgotPasswordPage from "./layouts/ForgotPasswordPage";

import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton
} from 'carbon-components-react';

import { useDispatch, useSelector } from 'react-redux';
import * as alertActions from '../store/actions/alertActions';

const AppRouter = () => {

  const alert = useSelector(state => state.alertReducers);
  const dispatch = useDispatch();

  const notificationProps = () => ({
    kind: alert.kind || 'info',
    role: 'alert',
    title: alert.title || '',
    subtitle: alert.subtitle || '',
    onCloseButtonClick: () => { dispatch(alertActions.hideToast()) },
  });
  return (
    <React.Fragment>
      {alert.status ?
        <InlineNotification
          {...notificationProps()}
          style={{ minWidth: '30rem', marginBottom: '.5rem', position: 'absolute', right: 8, top: 5 }}
        /> : undefined}
      <Switch>
        <PrivateRoute exact path="/" component={DashBoard} />
        <Route exact path="/" component={DashBoard} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/reset-password" component={ForgotPasswordPage} />
        <Redirect from="*" to="/" />
        {/* <Redirect to="/users" /> ? <Redirect from="*" to="/" /> */}
      </Switch>
    </React.Fragment>
  );
};

export default observer(AppRouter);
