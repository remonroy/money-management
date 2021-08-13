import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Dashboard from '../pages/Dashboard'
import NavLink from './Navigationbar/NavLink';




function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <NavLink></NavLink>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <Route path='/dashboard' component={Dashboard} />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
