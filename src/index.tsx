import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import App from './App';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import Login from './components/login/login';
import ProtectedRoute from './app/routes/routes'

ReactDOM.render(
  <BrowserRouter>
      <Route exact path='/login' component={Login}></Route>
      <ProtectedRoute path='/to-do' component={App}></ProtectedRoute>
    </BrowserRouter>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
