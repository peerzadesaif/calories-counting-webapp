/* eslint-disable */
import React, { Component, useState, useEffect } from 'react';
import * as Cookies from "js-cookie";

import { Provider, ReactReduxContext } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import store from "./store/store";
import history from "./store/history";

import AppRouter from "./components/AppRouter"


import logo from './logo.svg';
import './App.css';
const whiteList = ["/register", '/login', '/reset-password']; // no redirect whitelist

const App = () => {
  useEffect(() => {
    // Update the document title using the browser API
    history.listen((location, action) => {
      whiteList.includes(`${location.pathname}`) ? undefined : !Cookies.get("RCLOREHASH") ? history.push('/') : undefined
    });
  });

  return (
    <React.Fragment>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRouter />
        </ConnectedRouter>
      </Provider>
    </React.Fragment>
  );
}


export default App;
