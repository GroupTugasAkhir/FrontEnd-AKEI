import React from 'react';
import CardCustom from '../../component/card/CardCustom';
import './style.css'

const Product=()=> {
    return (
        <div className="section-product">
            <div className="title-text center-text">
                <h3>Product</h3>
            </div>
            <div className="container">
                <div className="nav-category">
                    <ul>
                        <li className='active'>All</li>
                        <li>Bed</li>
                        <li>Sofa</li>
                        <li>Chair</li>
                        <li>Light</li>
                    </ul>
                </div>
            </div>
            <div className="list-product">
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
                <CardCustom/>
            </div>
        </div>
    )
}

export default Product