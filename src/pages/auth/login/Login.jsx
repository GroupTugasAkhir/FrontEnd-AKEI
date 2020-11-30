import React, { useEffect, useState } from 'react';
import './logstyle.css'
import Authimg from '../../../assets/authimg.jpg'
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import Bounce from 'react-reveal/Bounce';

const Login = () => {
    const [seePass, setseePass] = useState(false)
    const [user, setuser] = useState('')
    const [pass, setpass] = useState('')
    const [errorinfo, seterrorinfo] = useState('')

    useEffect(()=> {

    },[])

    const onUsernameChange = (e) => {
        if(e.target.value) {
            setuser(e.target.value)
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
        if(user & pass) {
            console.log('user and pass');
        } else {
            seterrorinfo('need password & username')
        }
    }

    return (
        <>
            <div className='screenlog'>
                <div className='log-left-side'>
                    <div className='addon' >
                        
                    </div>
                    <div className='addon2' >
                        
                    </div>
                    <Bounce>
                        <div className="log-title-box">
                            <h2 className='maintext'>Sign In to <br/>Recharge Direct</h2>
                            <p>If you don't have an account <br/> You can &nbsp; &nbsp; <span style={{color:'#C3DCD6', fontWeight: 'bolder', cursor: 'pointer'}}>Register here!</span> </p>
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
                            <input className='mt-3' type="text" placeholder='Enter username' onChange={onUsernameChange} />
                            <input type={seePass?"text":"password"} placeholder='Password' onChange={onPasswordChange} />
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
                            </div>
                            <button className='signin-button' onClick={onSignIn} >
                                Sign In
                            </button>
                        </div>
                    </Fade>
                </div>
            </div>
        </>
    )
}

export default Login