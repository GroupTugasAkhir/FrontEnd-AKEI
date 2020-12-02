import React from 'react';
import './style.css'
import Prod1 from './../../assets/prod1.png'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';

const CardCustom=()=>{
    return (
        <div className="card-box">
            <div className="cart-icon">
                <AddShoppingCartIcon fontSize="small"/>
            </div>
            <div className="card-text">
                <div className="card-title">
                    <h6>Lorem, ipsum dolor.</h6>
                </div>
                <div className="card-price">
                    Rp 2.300.000
                </div>
            </div>
            <div className="card-img">
                <img src={Prod1} alt=""/>
            </div>
        </div>

    )
}

export default CardCustom