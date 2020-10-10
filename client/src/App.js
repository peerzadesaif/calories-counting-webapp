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
  const [showHeader, setShowHeader] = useState(false);

  useEffect(() => {
    setShowHeader(!whiteList.includes(`${window.location.pathname}`))
    // Update the document title using the browser API
    history.listen((location, action) => {
      whiteList.includes(`${location.pathname}`) ? undefined : !Cookies.get("CLCNWAHASH") ? history.push('/') : undefined
      setShowHeader(!whiteList.includes(`${location.pathname}`))
    });
  });

  return (
    <React.Fragment>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRouter whiteList={whiteList} showHeader={showHeader} />
        </ConnectedRouter>
      </Provider>
    </React.Fragment>
  );
}


export default App;
