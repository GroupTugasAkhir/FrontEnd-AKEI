import React, { useEffect, useState } from 'react';
import CardCustom from '../../component/card/CardCustom';
import './style.css'
import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'
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

    const productByCategory=(cat_id)=>{
        setCatalog(null)
        if(cat_id < 0) {
            Axios.get(`${API_URL_SQL}/admin/getproductbypage/1`)
            .then((res)=>{
                setCatalog(res.data)
            }).catch((err)=>console.log(err))
        } else {
            Axios.get(`${API_URL_SQL}/admin/getproductbycategory/${cat_id}`)
            .then((res)=>{
                setCatalog(res.data)
            }).catch((err)=>console.log(err))
        }
    }

    const renderCategory=()=>{
        return categories.map((val,index)=>{
            return (
                <li onClick={()=>productByCategory(val.category_id)}>{val.category_name}</li>
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
                        <li className='active' onClick={()=>productByCategory(-1)}>All</li>
                        {renderCategory()}
                    </ul>
                </div>
            </div>
            <div className="list-product mb-5">
                <CardCustom catalog={catalog}/>
            </div>
        </div>
    )
}

export default Product