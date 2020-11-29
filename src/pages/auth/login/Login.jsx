import React, { useState } from 'react';
import './logstyle.css'
import Authimg from '../../../assets/authimg.jpg'

const Login = () => {
    const [seePass, setseePass] = useState(false)

    return (
        <>
            <div className='screen'>
                <div className='log-left-side'>
                    <div className='addon' >
                        
                    </div>
                    <div className='addon2' >
                        
                    </div>
                    <div className="auth-title-box">
                        <h2 className='maintext'>Sign In to <br/>Recharge Direct</h2>
                        <p>If you don't have an account <br/> You can &nbsp; &nbsp; <span style={{color:'#C3DCD6', fontWeight: 'bolder', cursor: 'pointer'}}>Register here!</span> </p>
                    </div>
                    <div className='authimg' >
                        <img height='100%' width='100%' style={{objectFit: 'cover', objectPosition: 'bottom'}} src={Authimg} alt="authimg"/>
                    </div>
                </div>
                <div className='log-right-side'>
                    <div className='login-form'>
                        <input className='mt-3' type="text" placeholder='Enter username' />
                        <input type={seePass?"text":"password"} placeholder='Password' />
                        {
                            seePass?
                            <button className='seepassbut mb-4' onClick={()=>setseePass(false)} >
                                <i class="far fa-eye"></i>
                            </button>
                            :
                            <button className='seepassbut mb-4' onClick={()=>setseePass(true)}>
                                <i class="far fa-eye-slash"></i>
                            </button>

                        }
                        <button className='signin-button' >
                            Sign In
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login