import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
      </Switch>      
    </div>
  );
}

export default App;
