import React, { useEffect, useState } from 'react';
import './style.css'
import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'
import {priceFormatter} from './../../helpers/priceFormatter'

const NewArrival=()=>{
    const [newArrival,setNewArrival] = useState(null)
    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/newArrival`)
        .then((res)=>{
            setNewArrival(res.data)
        }).catch((err)=>console.log(err))

    },[])

    const renderItem=()=>{
        return newArrival.map((val,index)=>{
            if(index%2===0){
                return (
                    <div className="container-custom">
                        <div className="left-side-box center-item">
                            <img src={API_URL_SQL+val.image} alt=""/>
                            <div className="img-name">
                                <h4>{val.product_name}</h4>
                            </div>
                        </div>
                        <div className="right-side-box center-item col-flex">
                            <div className="description-box">
                                <div className="details-product">
                                    {val.description}
                                </div>
                                <div className="details-price">
                                    {priceFormatter(val.price)}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            } else {
                return (
                    <div className="container-custom">
                        <div className="left-side-box center-item">
                            <div className="description-box">
                                <div className="details-product">
                                    {val.description}
                                </div>
                                <div className="details-price">
                                    {priceFormatter(val.price)}
                                </div>
                            </div>
                        </div>
                        <div className="right-side-box center-item">
                            <img src={API_URL_SQL+val.image} alt=""/>
                            <div className="img-name">
                                <h4>{val.product_name}</h4>
                            </div>
                        </div>
                    </div>
                )
            }
        })
    }

    if(newArrival===null){
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className='new-arrival-section'>
            <div className="box-design-1"/>
            <div className="box-design-2"/>
            <div className="title-text center-text">
                <h3>New Arrival</h3>
            </div>     
            {/* <div className="container-custom">
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
            </div> */}
            {renderItem()}
        </div>

    )
}

export default NewArrival