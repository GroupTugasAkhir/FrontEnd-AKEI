import React from 'react';
import './style.css'
import Fav1 from './../../assets/fav1.png'
import Fav2 from './../../assets/fav2.png'

const BestProduct=()=>{
    return (
        <div className='section-best-product'>
            <div className="title-text center-text">
                <h3>Best Product</h3>
            </div> 
            <div className="container-best-product">
                <div className="left-side-best">
                    <div className="content-text">
                        <h5>Lorem, ipsum.</h5>
                        <h6>Rp 3.700.000</h6>
                    </div>
                    <div className="content-img">
                        <img src={Fav2} alt=""/>
                    </div>
                </div>
                <div className="right-side-best">
                    <div className="content-text">
                        <h5>Lorem, ipsum.</h5>
                        <h6>Rp 3.700.000</h6>
                    </div>
                    <div className="content-img">
                        <img src={Fav1} alt=""/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BestProduct