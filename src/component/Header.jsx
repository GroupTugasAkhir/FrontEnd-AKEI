import React, { Component, useEffect, useState, useRef } from 'react';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import './style.css'

const Header=()=>{

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
        <section className={navbar?'header actived':'header'}>
            <div className='header-logo'>
                <a>Akei</a>
            </div>
            <div className={isOpen?"navigation show":"navigation"}>
                <ul className='nav-list'>
                    <li className='nav-item'>
                        <a className={'nav-link'}>Home</a>
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