import React from 'react';
import './style.css'
import New1 from './../../assets/new1.jpg'
import New2 from './../../assets/new2.jpg'
import New3 from './../../assets/new3.jpg'

const NewArrival=()=>{
    return (
        <div className='new-arrival-section'>
            <div className="box-design-1"/>
            <div className="box-design-2"/>
            <div className="title-text center-text">
                <h3>New Arrival</h3>
            </div>     
            <div className="container-custom">
                <div className="left-side-box center-item">
                    <img src={New1} alt=""/>
                    <div className="img-name">
                        <h4>Lorem, ipsum.</h4>
                    </div>
                </div>
                <div className="right-side-box center-item col-flex">
                    <div className="description-box">
                        <div className="details-product">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsa omnis quas.
                        </div>
                        <div className="details-price">
                            Rp 3.700.000
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-custom">
                <div className="left-side-box center-item">
                    <div className="description-box">
                        <div className="details-product">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsa omnis quas.
                        </div>
                        <div className="details-price">
                            Rp 3.700.000
                        </div>
                    </div>
                </div>
                <div className="right-side-box center-item">
                    <img src={New2} alt=""/>
                    <div className="img-name">
                        <h4>Lorem, ipsum.</h4>
                    </div>
                </div>
            </div>
            <div className="container-custom">
                <div className="left-side-box center-item">
                    <img src={New3} alt=""/>
                    <div className="img-name">
                        <h4>Lorem, ipsum.</h4>
                    </div>
                </div>
                <div className="right-side-box center-item col-flex">
                    <div className="description-box">
                        <div className="details-product">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum ipsa omnis quas.
                        </div>
                        <div className="details-price">
                            Rp 3.700.000
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NewArrival