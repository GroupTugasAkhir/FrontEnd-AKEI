import React, { Component, useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './style.css'
import Logo from './../../assets/AkeiLogo.png'
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

    return(
        <section className={navbar?'header actived':'header'} style={{...props.style}} >
            <div className='header-logo'>
                <a>
                    <img src={Logo} alt=""/>
                </a>
            </div>
            <div className={isOpen?"navigation show":"navigation"}>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <Link to='/' className={'nav-link'}>Home</Link>
                    </li>
                    {/* <li className='nav-item'>
                        <a onClick={()=>toSection('product')} className={'nav-link'}>Product</a>
                    </li> */}
                    <li className='nav-item'>
                        <Link to='/login' className={'nav-link'}>Login</Link>
                    </li>
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