import React, { useState } from 'react';
import './regstyle.css'
import Mainregimg from '../../../assets/mainregimg.jpg'
import Secregimg from '../../../assets/secregimg.jpg'

const Register = () => {
    const [seePass, setseePass] = useState(false)

    return (
        <>
            <div className='screen'>
                <div className='reg-left-side'>
                    <div className='register-form'>
                        <input className='mt-3' type="text" placeholder='Enter username' />
                        <input className='mt-2' type="text" placeholder='Enter email' />
                        <input type={seePass?"text":"password"} placeholder='Password' />
                        <input type={seePass?"text":"password"} placeholder='Confirm Password' />
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
                        <button className='signup-button' >
                            Sign Up
                        </button>
                    </div>
                </div>
                <div className='reg-right-side'>
                    <div className='addon' >
                    
                    </div>
                    <div className='addon2' >
                        
                    </div>
                    <div className="auth-title-box">
                        <h2 className='maintext'>Sign Up Now!</h2>
                        <p>In order to experience <br/>New <span style={{color:'green', fontWeight: 'bolder'}}>environment</span> at your place </p>
                        
                    </div>
                    <div className='secregimg' >
                        <img height='100%' width='100%' src={Secregimg} alt="secregimg"/>
                    </div>
                    <div className='mainregimg' >
                        <img height='100%' width='100%' src={Mainregimg} alt="mainregimg"/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register