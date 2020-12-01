import React from 'react';
import Header from '../component/Header';
import './style.css'
import Intro from './../assets/intro.png'
import NewArrival from './NewArrival'

const Home=()=>{
    return (
        <div>
            <Header/>
            <section className='home-section'>
                <div className="home-left-side">
                    <div className="home-title-box">
                        <h2>Good Living <br/> Better <span style={{color:'#64dfdf'}}>Live</span></h2>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore eos, explicabo sapiente ipsa minus aperiam!</p>
                    </div>
                </div>
                <div className="home-right-side">
                    <div className="white-line l-1"/>
                    <div className="white-line l-2"/>
                    <div className="white-line l-3"/>
                    <div className="home-img">
                        <img src={Intro} alt=""/>
                    </div>
                    <div className="home-img-text">
                        <span>FRIHETEN <br/> Corner sofa-bed with storage</span>
                    </div>
                </div>
            </section>
            <NewArrival/>
        </div>
    )
}

export default Home