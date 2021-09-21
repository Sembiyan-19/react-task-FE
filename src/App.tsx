import React from 'react';
import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
import './App.css';
import Category from './components/categories/categories';
import NavBar from './components/nav-bar/nav-bar'
import { Provider } from 'react-redux';
import Task from './components/tasks/tasks';
import Step from './components/steps/steps';
import store from './reducers/rootReducer';

function App() {
  return (
    <Provider store={store}>
    <div className="main-container">
      <NavBar></NavBar>
      <Category></Category>
      <Task></Task>
      <Step></Step>
    </div>
  </Provider>
  );
}

export default App;
