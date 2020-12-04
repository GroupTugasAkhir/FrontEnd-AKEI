import React, { useEffect, useState } from 'react';
import CardCustom from '../../component/card/CardCustom';
import './style.css'
import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'
import {priceFormatter} from './../../helpers/priceFormatter'

const Product=()=> {

    const [categories,setCategories]=useState(null)
    const [catalog,setCatalog]=useState(null)

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/category`)
        .then((res)=>{
            setCategories(res.data)
        }).catch((err)=>console.log(err))
        Axios.get(`${API_URL_SQL}/admin/getproductbypage/1`)
        .then((res)=>{
            setCatalog(res.data)
        }).catch((err)=>console.log(err))

    },[])

    const renderCategory=()=>{
        return categories.map((val,index)=>{
            return (
                <li>{val.category_name}</li>
            )
        })
    }

    if(categories===null || catalog===null){
        return (
            <div>Loading</div>
        )
    }

    return (
        <div className="section-product" id="product">
            <div className="title-text center-text">
                <h3>Product</h3>
            </div>
            <div className="container">
                <div className="nav-category">
                    <ul>
                        <li className='active'>All</li>
                        {renderCategory()}
                    </ul>
                </div>
            </div>
            <div className="list-product mb-5">
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