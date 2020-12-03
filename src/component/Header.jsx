import React, { Component, useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './style.css'
import Logo from './../assets/AkeiLogo.png'
import {Link} from 'react-router-dom'

const Header=(props)=>{

    const [isOpen,setIsOpen]=useState(false)
    const [navbar,setNavbar]=useState(false)
    
    useEffect(()=>{
        
    },[])
    
    const changeBackground=()=>{
        if(window.scrollY >= 100){
            setNavbar(true)
        } else {
            setNavbar(false)
        }
    }

    window.addEventListener('scroll',changeBackground)

    return(
        <section className={navbar?'header actived':'header'} style={{...props.style}} >
            <div className='header-logo'>
                <Link to='/'>
                    <img src={Logo} alt=""/>
                </Link>
            </div>
            <div className={isOpen?"navigation show":"navigation"}>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a className={'nav-link'}>Home</a>
                    </li>
                    <li className='nav-item'>
                        <a className={'nav-link'}>Product</a>
                    </li>
                    <Link to='/login'>
                        <li className='nav-item'>
                            <a className={'nav-link'}>Login</a>
                        </li>
                    </Link>
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

export default Header