import React, { useEffect, useState } from 'react';
import './style.css'
import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'
import {priceFormatter} from './../../helpers/priceFormatter'


const BestProduct=()=>{

    const [popularProduct,setPopularProduct]=useState(null)

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/popular`)
        .then((res)=>{
            setPopularProduct(res.data)
        }).catch((err)=>console.log(err))
    },[])

    const renderProduct=()=>{
        return popularProduct.map((val,index)=>{
            if(index%2===0){
                return (
                    <div className="left-side-best">
                        <div className="content-text">
                            <h5>{val.product_name}</h5>
                            <h6>{priceFormatter(val.price)}</h6>
                        </div>
                        <div className="content-img">
                            <img src={API_URL_SQL+val.image} alt=""/>
                        </div>
                    </div>
    
                )
            } else{
                return (
                    <div className="right-side-best">
                        <div className="content-text">
                            <h5>{val.product_name}</h5>
                            <h6>{priceFormatter(val.price)}</h6>
                        </div>
                        <div className="content-img">
                            <img src={API_URL_SQL+val.image} alt=""/>
                        </div>
                    </div>
    
                )
            }
        })
    }

    if(popularProduct===null){
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='section-best-product'>
            <div className="title-text center-text">
                <h3>Favourite Product</h3>
            </div> 
            <div className="container-best-product">
                {/* <div className="left-side-best">
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
                </div> */}
                {renderProduct()}
            </div>
        </div>
    )
}

export default BestProduct