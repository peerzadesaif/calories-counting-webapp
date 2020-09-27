/* eslint-disable */
import React from "react";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

import PrivateRoute from "./PrivateRoute"
import LoginPage from "./layouts/LoginPage";
import DashBoard from "./layouts/DashBoard";
import RegisterPage from "./layouts/RegisterPage";
import ForgotPasswordPage from "./layouts/ForgotPasswordPage";

import AddMeals from './views/AddMeals';
import MealsList from './views/MealsList';
import EditMeals from './views/EditMeals';

import * as userActions from '../store/actions/userActions';
import * as alertActions from '../store/actions/alertActions';

import history from "../store/history";
import * as Cookies from "js-cookie";

import {
  ToastNotification,
  InlineNotification,
  NotificationActionButton
} from 'carbon-components-react';

import {
  Content,
  Header,
  HeaderMenuButton,
  HeaderName,
  HeaderContainer,
  SkipToContent,
  SideNav,
  SideNavItems,
  SideNavLink,
  //
  HeaderMenuItem,
  HeaderNavigation
} from 'carbon-components-react';

import { Fade16 } from '@carbon/icons-react';

import { useDispatch, useSelector } from 'react-redux';

const AppRouter = (props) => {
  const alert = useSelector(state => state.alertReducers);
  const dispatch = useDispatch();

  const handleOnLogout = () => {
    dispatch(userActions.logout());
  }
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
          style={{ minWidth: '30rem', marginBottom: '.5rem', position: 'absolute', right: 8, top: 5, zIndex: 99999 }}
        /> : undefined}

      {(props.showHeader ? <HeaderContainer
        render={({ isSideNavExpanded, onClickSideNavExpand }) => (
          <React.Fragment>
            <Header aria-label="Calories.io Platform Name">
              <SkipToContent />
              <HeaderMenuButton
                aria-label="Open menu"
                onClick={onClickSideNavExpand}
                isActive={isSideNavExpanded}
              />
              <HeaderName onClick={() => history.push('/meal-list')} prefix="Calories.io">
                [Platform]
                            </HeaderName>
              <HeaderNavigation aria-label="IBM [Platform]">
                <HeaderMenuItem isCurrentPage={window.location.pathname === '/meal-list'} onClick={() => history.push('/meal-list')}>
                  Meal List
                </HeaderMenuItem>
                <HeaderMenuItem isCurrentPage={window.location.pathname === '/add-meal'} onClick={() => history.push('/add-meal')}>
                  Add List
                </HeaderMenuItem>
                <HeaderMenuItem onClick={() => handleOnLogout()}>
                  Log out
                </HeaderMenuItem>
              </HeaderNavigation>

            </Header>

          </React.Fragment>
        )}
      /> : undefined
      )}
      <Switch>
        {/* {!Cookies.get("CLCNWAHASH") ? 
        :<Route exact path="/" component={DashBoard} />} */}
        {/* <PrivateRoute exact path="/" component={DashBoard} /> */}

        <PrivateRoute exact path="/add-meal" component={AddMeals} />
        <PrivateRoute exact path="/meal-list" component={MealsList} />
        <PrivateRoute exact path="/update-meal/:_id" component={EditMeals} />

        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/login" component={LoginPage} />

        <Route exact path="/reset-password" component={ForgotPasswordPage} />
        <Redirect from="*" to="/meal-list" />
        {/* <Redirect to="/users" /> ? <Redirect from="*" to="/" /> */}
      </Switch>
    </React.Fragment>
  );
};

export default observer(AppRouter);
