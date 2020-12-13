import React, { useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './style.css'
import Logo from './../../assets/AkeiLogo.png'
import Loading from './../Loading'
import Box from '@material-ui/core/Box';
import {Link, Redirect, useHistory} from 'react-router-dom'
import { connect } from 'react-redux';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Notifications from '@material-ui/icons/Notifications'
import Swal from 'sweetalert2'
import {LogoutFunc} from './../../redux/actions'
import Axios from 'axios';
import { API_URL_SQL, dateFormatter } from '../../helpers';
import firebase from 'firebase'
import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    typography: {
      padding: theme.spacing(2),
    },
}));

const Header=(props)=>{
    let history = useHistory()
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [isOpen,setIsOpen]=useState(false)
    const [navbar,setNavbar]=useState(false)
    const [cartCount,setCartCount]=useState(null)
    const [notifCount, setNotifCount]=useState(null)
    const [dataNotif, setdataNotif]=useState([])
    
    useEffect(()=>{
        console.log(props.Auth.user_id)
        console.log(props)
        getCartLength()
    },[])

    useEffect(()=> {
        getCartLength()
    },[props.Cart.cartLength])

    const getCartLength=()=>{
        Axios.get(`${API_URL_SQL}/cart/cartLength/${props.Auth.user_id}`)
        .then((res)=>{
            setCartCount(res.data[0].cart)
            Axios.get(`${API_URL_SQL}/orders/getNotif/${props.Auth.user_id}`)
            .then((res2)=>{
                setdataNotif(res2.data)
                console.log(res2.data.length)
                console.log(res2.data)
                
            }).catch((err)=>console.log(err))
        }).catch((err)=>console.log(err))
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    
    
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

    const onNotifClick=(idTr, status)=>{
        Axios.post(`${API_URL_SQL}/orders/updateNotif/${idTr}`)
        .then((res2)=>{
            setdataNotif(res2.data)
            console.log(res2.data)
            if(status == 'completed'){
                history.push('/user/completed')
                window.location.reload();
            }
            history.push('/user/ongoing')
            window.location.reload();
            
        }).catch((err)=>console.log(err))
    }

    // const onSeeAllClick=()=>{
    //     history.push('/user/notification')
    //     window.location.reload();
    // }

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
                                <li className='nav-item'>
                                    <div>
                                        <Notifications onClick={handleClick}/> 
                                        {
                                            dataNotif ?
                                            <div className="badge-custom">
                                                <span>{dataNotif.length}</span>
                                            </div>
                                            :
                                            null
                                        }
                                        <Popover
                                            id={id}
                                            open={open}
                                            anchorEl={anchorEl}
                                            onClose={handleClose}
                                            anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left',
                                              }}
                                              transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                              }}
                                        >
                                            <div style={{width:300}}>
                                                <div className='notification'>Notifications</div>
                                                {
                                                    dataNotif ?
                                                    dataNotif.map((val, index)=>(
                                                        <div className='notif-content' key={index} onClick={()=>onNotifClick(val.transaction_id, val.status)}>
                                                            <div >
                                                                {
                                                                    val.status == 'waitingAdminConfirmation' ? 
                                                                    'Confirming your payment'
                                                                    : val.status == 'paymentCompleted' ?
                                                                    'Payment confirmed'
                                                                    : val.status_log == 'completed' ?
                                                                    'Completed'
                                                                    : val.status == 'productOTW' ?
                                                                    'On your way'
                                                                    : 'Delivered'
                                                                }
                                                            </div>
                                                            <div style={{fontSize:13, color:'gray'}}>Transaction ID: {val.trans_code}</div>
                                                            <div style={{fontSize:13, color:'gray'}}>{dateFormatter(parseInt(val.date_newest))}</div>
                                                        </div>
                                                    ))
                                                    : 'loading'
                                                }
                                                <Link to='/user/notification'>
                                                    <div className='see-all'>See All</div>
                                                </Link>
                                            </div>
                                        </Popover>
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
                                        <li className="my-1">
                                            <Link to='/user/ongoing'>
                                                Orders
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