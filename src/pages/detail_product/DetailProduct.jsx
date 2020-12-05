import React, { useEffect, useState } from 'react';
import Header from './../../component/header/Header'
import './style.css'
import { priceFormatter } from '../../helpers/priceFormatter';
import { API_URL_SQL } from '../../helpers/apiurl';
import Axios from 'axios'

const DetailProduct = (props) => {
    const {match} = props
    let {id} = match.params
    
    const [qtyproduct, setqtyproduct] = useState(0)
    const [detailProd,setDetailProd] = useState(null)
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

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/getproduct/${id}`)
        .then((res)=>{
            setDetailProd(res.data[0])
        }).catch((err)=>console.log(err))
    },[])

    
    if(detailProd===null){
        return (
            <div>Loading</div>
        )
    }

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div className='mainsection'>
                <div className='detailsection'>
                    <div className='det-left-side'>
                        <div className='det-img'>
                            <img src={API_URL_SQL+detailProd.image} style={{objectFit: 'cover', objectPosition: '50% 50%'}} width='100%' height='100%' alt="productimg"/>
                        </div>
                    </div>
                    <div className='det-right-side'>
                        <div className='inside-right-side'>
                            <div className='categ-product'>
                                <div className='categ-product-title'>
                                    {detailProd.category_name}
                                </div>
                            </div>
                            <div>
                                <div className='product-title'>
                                    {detailProd.product_name}
                                </div>
                                <div className='product-desc'>
                                    {detailProd.description}
                                </div>
                            </div>
                            <div className='product-qty-section'>
                                <div className='qty-side'>
                                    <div className='qty-title'>
                                        QUANTITY
                                    </div>
                                    <div className='d-flex mt-1'>
                                        {
                                            qtyproduct < 1?
                                            <button className='qty-button-minus' style={{backgroundColor:'#e5e5e5'}} disabled>-</button>
                                            :
                                            <button className='qty-button-minus' onClick={()=>minBtn()}>-</button>
                                        }
                                        <div className='qty-area'>
                                            {qtyproduct}
                                        </div>
                                        <button className='qty-button-plus' onClick={()=>plusBtn()}>+</button>
                                    </div>
                                </div>
                                <div className='price-side'>
                                    {priceFormatter(detailProd.price)}
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