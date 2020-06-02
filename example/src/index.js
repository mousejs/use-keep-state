import React from 'react';
import ReactDOM from 'react-dom';
import "antd/dist/antd.css";
import * as serviceWorker from './serviceWorker';
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./home";
import Page1 from "./page-1";
import Page2 from "./page-2";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/page1" component={Page1} />
        <Route path="/page2" component={Page2} />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
