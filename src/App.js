import React, { Component, useEffect } from 'react';
import { Switch,Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/login/Login'
import Register from './pages/auth/register/Register'
import Verified from './pages/verified/Verified'
import Cart from './pages/cart/Cart'
import DetailProduct from './pages/detail_product/DetailProduct'
import Testing from './pages/Testing'
import UserProfile from './pages/user_profile/UserProfile'
import 'bootstrap/dist/css/bootstrap.css';

import {connect} from 'react-redux'
import {KeepLogin} from './redux/actions'

function App(props) {
  useEffect(()=> {
    let datauser = localStorage.getItem('user')
    if(datauser) {
      props.KeepLogin()
    }
  },[])

  if(props.Auth.isLoading) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/register' component={Register}/>
        <Route exact path='/verified' component={Verified} />
        <Route exact path='/detailproduct/:id' component={DetailProduct} />
        <Route exact path='/cart' component={Cart} />
        <Route exact path='/test' component={Testing}/>
        <Route exact path='/userprofile' component={UserProfile}/>
      </Switch>      
    </div>
  );
}

const Mapstatetoprops = (state) => {
  return {
    Auth: state.Auth
  }
}

export default connect(Mapstatetoprops,{KeepLogin}) (App);
