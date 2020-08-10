import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './../node_modules/@fortawesome/fontawesome-free/css/brands.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/fontawesome.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/regular.min.css';
import './../node_modules/@fortawesome/fontawesome-free/css/solid.min.css';
import './App.css';
import Navbar from './components/layouts/Navbar';
import Home from './components/pages/Home';
import GuestState from './context/guestcontext/GuestState';
import AuthState from './context/authcontext/AuthState';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import PrivateRoutes from './components/pages/routes/PrivateRoutes';
import setToken from './utils/SetToken';

if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {

  return (
    <AuthState>
      <GuestState>
        <BrowserRouter>
          <div>
            <Navbar />
            <Switch>
              <PrivateRoutes exact path="/" component={ Home } />
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
            </Switch>
          </div>
        </BrowserRouter>
      </GuestState>
    </AuthState>
  );
}

export default App;
