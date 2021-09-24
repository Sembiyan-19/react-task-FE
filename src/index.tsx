import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  Route
} from "react-router-dom";
import Login from './components/login/login';
import ProtectedRoute from './routes/routes'

ReactDOM.render(
  <BrowserRouter>
      <Route exact path='/login' component={Login}></Route>
      <ProtectedRoute path='/to-do' component={App}></ProtectedRoute>
    </BrowserRouter>
  ,
  document.getElementById('root')
);
