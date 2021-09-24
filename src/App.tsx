import Category from './components/categories/categories';
import NavBar from './components/nav-bar/nav-bar'
import { Provider } from 'react-redux';
import Task from './components/tasks/tasks';
import Step from './components/steps/steps';
import store from './store';

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
