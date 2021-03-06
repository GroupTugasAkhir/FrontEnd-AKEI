import React, { useEffect, useState } from 'react';
import './regstyle.css'
import Mainregimg from '../../../assets/mainregimg.jpg'
import Secregimg from '../../../assets/secregimg.jpg'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';

import {connect} from 'react-redux'
import {RegisThunk} from './../../../redux/actions'
import {Redirect} from 'react-router-dom'

const Register = (props) => {
    const [seePass, setseePass] = useState(false)
    const [user, setuser] = useState('')
    const [email, setemail] = useState('')
    const [pass, setpass] = useState('')
    const [passconfirm, setpassconfirm] = useState('')
    const [errorinfo, seterrorinfo] = useState('')
    const [confirminfo, setconfirminfo] = useState('')

    useEffect(()=> {

    },[])

    const onUsernameChange = (e) => {
        if(e.target.value) {
            setuser(e.target.value)
            seterrorinfo('')
        } else if(e.target.value === '') {
            seterrorinfo('Username is required!')
        }
    }

    const onEmailChange = (e) => {
        var emailtester = new RegExp(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,15}/g).test(e.target.value)
        if(emailtester) {
            setemail(e.target.value)
            seterrorinfo('')
        } else if (e.target.value === '') {
            seterrorinfo('')
        } else {
            seterrorinfo('Email is not in a valid pattern')
        }
    }

    const onPasswordChange = (e) => {
        var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,32}$/
        var passwordtester = reg.test(e.target.value)

        if(passwordtester) {
            setpass(e.target.value)
            seterrorinfo('')
        } else if(e.target.value === '') {
            seterrorinfo('')
        } else {
            seterrorinfo('Must Contain 6 Characters, One Uppercase, One Lowercase, and One Number')
        }
    }

    const onPasswordConfirm = (e) => {
        if(e.target.value === pass) {
            setpassconfirm(e.target.value)
            seterrorinfo('')
            setconfirminfo('Password is match')
        } else if(e.target.value === '') {
            seterrorinfo('')
            setconfirminfo('')
        } else {
            seterrorinfo('Password is not match!')
            setconfirminfo('')
        }
    }

    const onSignUp = () => {
        console.log(user);
        console.log(email);
        console.log(passconfirm);

        let dataRegis = {
            username: user,
            email: email,
            password: passconfirm
        }

        props.RegisThunk(dataRegis)
    }

    if(props.Auth.isLogin) {
        return <Redirect to='/' />
    }

    return (
        <>
            <div className='screen'>
                <div className='reg-left-side'>
                    <Fade left cascade>
                        <div className='register-form'>
                            <div className='reg-input-button'>
                                <input className='mt-3' type="text" placeholder='Enter username' onChange={onUsernameChange} />
                            </div>
                            <div className='reg-input-button'>
                                <input className='mt-2' type="text" placeholder='Enter email' onChange={onEmailChange} />
                            </div>
                            <div className='reg-input-button'>
                                <input type={seePass?"text":"password"} placeholder='Password' onChange={onPasswordChange} />
                            </div>
                            <div className='reg-input-button'>
                                <input type={seePass?"text":"password"} placeholder='Confirm Password' onChange={onPasswordConfirm} />
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
                                            {errorinfo} <span className='errorstyle' onClick={()=>seterrorinfo('')}>X</span>
                                        </div>
                                    </Fade>
                                    :
                                    null
                                }
                                {
                                    confirminfo?
                                    <Fade top>
                                        <div className='alert alert-success'>
                                            {confirminfo} <span className='errorstyle' onClick={()=>setconfirminfo('')} >X</span>
                                        </div>
                                    </Fade>
                                    :
                                    null
                                }
                            </div>
                            <button className='signup-button' onClick={onSignUp} >
                                Sign Up
                            </button>
                        </div>
                    </Fade>
                </div>
                <div className='reg-right-side'>
                    <div className='addon3' >
                    
                    </div>
                    <div className='addon4' >
                        
                    </div>
                    <Bounce>
                        <div className="auth-title-box">
                            <h2 className='maintext'>Sign Up Now!</h2>
                            <p>In order to experience <br/>New <span style={{color:'green', fontWeight: 'bolder'}}>environment</span> at your place </p>
                            
                        </div>
                    </Bounce>
                    <Zoom cascade>
                        <div className='secregimg' >
                            <img height='100%' width='100%' src={Secregimg} alt="secregimg"/>
                        </div>
                        <div className='mainregimg' >
                            <img height='100%' width='100%' src={Mainregimg} alt="mainregimg"/>
                        </div>
                    </Zoom>
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

export default connect(Mapstatetoprops,{RegisThunk})(Register)