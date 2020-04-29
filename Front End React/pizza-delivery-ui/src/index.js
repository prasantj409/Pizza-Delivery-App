import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import * as serviceWorker from './serviceWorker';

import CheckOut from './Components/CheckOut';
import OrderHistory from './Components/OrderHistory';
import Login from './Components/Login';
import Form from './Components/Form';

const routing = (
  <Router>
    <div>
      <Route path="/" component={Form} exact />
      <Route path="/PizzaHome" component={App} />
      <Route path="/CheckOut" component={CheckOut} />
      <Route path="/OrderHistory" component={OrderHistory} />
      <Route path="/Login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(
  routing,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
