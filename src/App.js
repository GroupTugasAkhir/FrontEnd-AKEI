import React, { Component } from 'react';
import { Switch,Route } from 'react-router-dom'
import Home from './pages/Home'
import 'bootstrap/dist/css/bootstrap.css';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
      </Switch>      
    </div>
  );
}

export default App;
