import React, { useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './style.css'
import Logo from './../../assets/AkeiLogo.png'
import {Link, Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Swal from 'sweetalert2'
import {LogoutFunc} from './../../redux/actions'
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers';
import firebase from 'firebase'

const Header=(props)=>{
    let history = useHistory()
    const [isOpen,setIsOpen]=useState(false)
    const [navbar,setNavbar]=useState(false)
    const [cartCount,setCartCount]=useState(null)
    
    useEffect(()=>{
        console.log(props.Auth.user_id)
        getCartLength()
    },[])

    useEffect(()=> {
        getCartLength()
    },[props.Cart.cartLength])

    const getCartLength=()=>{
        Axios.get(`${API_URL_SQL}/cart/cartLength/${props.Auth.user_id}`)
        .then((res)=>{
            setCartCount(res.data[0].cart)
        }).catch((err)=>console.log(err))
    }
    
    const changeBackground=()=>{
        if(window.scrollY >= 100){
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll',changeBackground)

    const toSection=(section)=>{
        let element = document.getElementById(section)
        element.scrollIntoView(true)
        let heightHeader = 80
        let scrolledY = window.scrollY
        if(scrolledY){
            window.scrollTo({
                behavior:'smooth',
                top:scrolledY - heightHeader
            })
        }
        setIsOpen(false)
    }

    const onLogoutGoogle = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    const logout = () => {
        Swal.fire({
          title: 'Are you sure?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Logout!'
        }).then((result) => {
          if (result.isConfirmed) {
            localStorage.clear()
            props.LogoutFunc()
            onLogoutGoogle()
            Swal.fire(
              'Goodbye!',
              'You just logout',
              'success'
            )
            history.push('/')
          }
        })
    }

    if(cartCount===null){
        return (
            <div>Loading</div>
        )
    }

    return(
        <section className={navbar?'header actived':'header'} style={{...props.style}} >
            <div className='header-logo'>
                <Link to='/'>
                    <img src={Logo} alt=""/>
                </Link>
            </div>
            <div className={isOpen?"navigation show":"navigation"}>
                <ul className='nav-list'>
                    <li className='nav-item drop-down'>
                        <div>
                            <Link to='/'>
                                Home
                            </Link>
                        </div>
                    </li>
                    {
                        props.Auth.isLogin?
                            props.Auth.role_id===1?
                            <>
                                <li className='nav-item'>
                                    <div>
                                        <Link to='/cart'>
                                            <AddShoppingCartIcon/> 
                                            {
                                                cartCount?
                                                <div className="badge-custom">
                                                    <span>{props.Cart.cartLength}</span>
                                                </div>
                                                :
                                                null
                                            }
                                        </Link>
                                    </div>
                                </li>
                                <li className='nav-item drop-down'>
                                    <div><AccountCircleIcon/>{props.Auth.username}</div>
                                    <div className="drop-down-content mt-2">
                                        <li className="my-1">
                                            <Link to='/userprofile'>
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="my-1" onClick={logout}>Logout</li>
                                    </div>
                                </li>
                            </>
                            :
                            <>
                                <li className='nav-item drop-down'>
                                    <div><AccountCircleIcon/>{props.Auth.username}</div>
                                    <div className="drop-down-content mt-2">
                                        <li className="my-1">
                                            <Link to='/userprofile'>
                                                Profile
                                            </Link>
                                        </li>
                                        <li className="my-1" onClick={logout}>Logout</li>
                                    </div>
                                </li>
                            </>
                        :
                        <li className='nav-item drop-down'>
                            <div>
                                <Link to='/login'>
                                    Login
                                </Link>
                            </div>
                        </li>
                    }
                </ul>
            </div>
            <div className='toggle-nav'>
                {
                    isOpen?
                    <CloseIcon onClick={()=>setIsOpen(false)} />
                    :
                    <MenuIcon onClick={()=>setIsOpen(true)} />
                }
            </div>
        </section>
    )
}

const ReduxProps=(state)=>{
    return{
        Auth:state.Auth,
        Cart: state.Cart
    }
  }
export default connect(ReduxProps,{LogoutFunc})(Header)