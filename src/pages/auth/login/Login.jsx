import React, { useEffect, useState } from 'react';
import './logstyle.css'
import Authimg from '../../../assets/authimg.jpg'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';
import {LoginThunk, FirebaseAuth} from './../../../redux/actions'

import {connect} from 'react-redux'
import {Redirect, Link} from 'react-router-dom'
import firebase from 'firebase'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
    apiKey: 'AIzaSyAZSk2P-Ir4U_lvshtLuc3vXE3y4Imv-Pw',
    authDomain: 'akei-firebase-auth.firebaseapp.com',
};
firebase.initializeApp(config);

const Login = (props) => {
    const [seePass, setseePass] = useState(false)
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [errorinfo, seterrorinfo] = useState('')
    // const [isSignedIn, setisSignedIn] = useState(false)

    useEffect(()=> {
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
              // User is signed in.
              console.log('user sign in');
              console.log(user);
            } else {
              // No user is signed in.
              console.log('not sign in');
            }
          });
    },[])

    const onEmailChange = (e) => {
        if(e.target.value) {
            setemail(e.target.value)
            seterrorinfo('')
        } else {
            seterrorinfo('')
        }
    }

    const onPasswordChange = (e) => {
        if(e.target.value) {
            setpass(e.target.value)
            seterrorinfo('')
        } else {
            seterrorinfo('')
        }
    }

    const onSignIn = () => {
        if(email && pass) {
            let dataLogin = {
                email: email,
                password: pass
            }
            props.LoginThunk(dataLogin)
        } else {
            seterrorinfo('need password & email')
        }
    }

    const onSubmitGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Google Access Token. You can use it to access the Google API.
            // var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            let dataUserGoogle = {
                username: user.displayName,
                email: user.email,
                password: user.uid,
                photo: user.photoURL
            }
            props.FirebaseAuth(dataUserGoogle)
            // ...
          }).catch(function(error) {
            console.log(error);
            let dataUserGoogle = {
                email: error.email,
            }
            props.FirebaseAuth(dataUserGoogle)
          });
    }

    const onSubmitFacebook = () => {
        var provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // The signed-in user info.
            var user = result.user;
            console.log(user);
            let dataUserFacebook = {
                username: user.displayName,
                email: user.email,
                password: user.uid,
                photo: user.photoURL
            }
            props.FirebaseAuth(dataUserFacebook)
            // ...
          }).catch(function(error) {
            console.log(error.email);
            let dataUserFacebook = {
                email: error.email,
            }
            props.FirebaseAuth(dataUserFacebook)
          });
    }

    const onLogoutGoogle = () => {
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
          }).catch(function(error) {
            // An error happened.
          });
    }

    if(props.Auth.isLogin) {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='screenlog'>
                <div className='log-left-side'>
                    <div className='addon' />
                    <div className='addon2' />
                    <Bounce>
                        <div className="log-title-box">
                            <h2 className='maintext'>Sign In to <br/>Recharge Direct</h2>
                            <p>If you don't have an account <br/> You can &nbsp; &nbsp; <Link to='/register'><span style={{color:'green', fontWeight: 'bolder', cursor: 'pointer'}}>Register here!</span></Link> </p>
                        </div>
                    </Bounce>
                    <Zoom cascade>
                        <div className='logimg' >
                            <img height='100%' width='100%' style={{objectFit: 'cover', objectPosition: 'bottom'}} src={Authimg} alt="authimg"/>
                        </div>
                    </Zoom>
                </div>
                <div className='log-right-side'>
                    <Fade right>
                        <div className='login-form'>
                            <div className='input-button'>
                                <input className='mt-3' type="text" placeholder='Enter email' onChange={onEmailChange} />
                            </div>
                            <div className='input-button'>
                                <input type={seePass?"text":"password"} placeholder='Password' onChange={onPasswordChange} />
                            </div>
                            {
                                seePass?
                                <button className='seepassbut mb-4' onClick={()=>setseePass(false)} >
                                    <i className="far fa-eye"></i>
                                </button>
                                :
                                <button className='seepassbut mb-4' onClick={()=>setseePass(true)}>
                                    <i className="far fa-eye-slash"></i>
                                </button>

                            }
                            <div style={{width: '270px'}}>
                                {
                                    errorinfo?
                                    <Fade top>
                                        <div className='alert alert-danger'>
                                            {errorinfo} <span className='logerrorstyle' onClick={()=>seterrorinfo('')}>X</span>
                                        </div>
                                    </Fade>
                                    :
                                    null
                                }
                                {
                                    props.Auth.error?
                                    <Fade top>
                                        <div className='alert alert-danger'>
                                            {props.Auth.error}
                                        </div>
                                    </Fade>
                                    :
                                    null
                                }
                            </div>
                            <button className='signin-button' onClick={onSignIn} >
                                Sign In
                            </button>
                            <div className='mt-3' >
                                or continue with
                            </div>
                            <div className='d-flex flex-row my-4'>
                                <div className='authicon' onClick={onSubmitGoogle} >
                                    <i className="fab fa-google" style={{color: 'red'}} ></i>
                                </div>
                                <div className='authicon ml-3' onClick={onSubmitFacebook} >
                                    <i class="fab fa-facebook" style={{color: 'blue'}} ></i>
                                </div>
                                <div onClick={onLogoutGoogle}>
                                    Logout
                                </div>
                            </div>
                        </div>
                    </Fade>
                </div>
            </div>
        </>
    )
}

const Mapstatetoprops = (state) => {
    return {
        Auth: state.Auth
    }
}


export default connect(Mapstatetoprops,{LoginThunk, FirebaseAuth})(Login)