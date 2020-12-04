import React, { useState } from 'react';
import Header from './../../component/header/Header'
import './style.css'

import Testimg from './../../assets/mainregimg.jpg'

const DetailProduct = () => {
    const [qtyproduct, setqtyproduct] = useState(0)

    const plusBtn = () => {
        let newQty = qtyproduct
        newQty++
        setqtyproduct(newQty)
    }

    const minBtn = () => {
        let newQty = qtyproduct
        newQty--
        setqtyproduct(newQty)
    }

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div className='mainsection'>
                <div className='detailsection'>
                    <div className='det-left-side'>
                        <div className='det-img'>
                            <img src={Testimg} style={{objectFit: 'cover', objectPosition: '50% 50%'}} width='100%' height='100%' alt="productimg"/>
                        </div>
                    </div>
                    <div className='det-right-side'>
                        <div className='inside-right-side'>
                            <div className='categ-product'>
                                <div className='categ-product-title'>
                                    CATEGORY
                                </div>
                            </div>
                            <div>
                                <div className='product-title'>
                                    Kursi
                                </div>
                                <div className='product-desc'>
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloremque consectetur earum vitae, inventore dolor, tempore itaque facilis quisquam placeat aliquid expedita officiis nemo voluptatum enim sunt ipsa? Minus, voluptatem voluptatum!
                                </div>
                            </div>
                            <div className='product-qty-section'>
                                <div className='qty-side'>
                                    <div className='qty-title'>
                                        QUANTITY
                                    </div>
                                    <div className='d-flex mt-1'>
                                        <button className='qty-button-minus' onClick={()=>minBtn()}>-</button>
                                        <div className='qty-area'>
                                            {qtyproduct}
                                        </div>
                                        <button className='qty-button-plus' onClick={()=>plusBtn()}>+</button>
                                    </div>
                                </div>
                                <div className='price-side'>
                                    Rp. 10.000
                                </div>
                            </div>
                            <button className='addcart-button'>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailProduct