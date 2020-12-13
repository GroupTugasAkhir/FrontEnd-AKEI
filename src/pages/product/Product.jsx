import React, { useEffect, useRef, useState } from 'react';
import CardCustom from '../../component/card/CardCustom';
import './style.css'
import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'
import debounce from 'lodash.debounce'
const Product=()=> {

    const [categories,setCategories]=useState(null)
    const [catalog,setCatalog]=useState(null)
    const [searchKey,setSearchKey]=useState(null)
    const [page, setpage] = useState(1)
    const [countAll, setcountAll] = useState(0)
    const [countCateg, setcountCateg] = useState(100)

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/category`)
        .then((res)=>{
            setCategories(res.data)
        }).catch((err)=>console.log(err))
        Axios.get(`${API_URL_SQL}/admin/getproductbypage/${page}`)
        .then((res)=>{
            setCatalog(res.data)
            console.log(res.data);
        }).catch((err)=>console.log(err))
        Axios.get(`${API_URL_SQL}/admin/getAllProductCount`)
        .then((res)=> {
            setcountAll(res.data[0].countAllProd)
            console.log(res.data[0].countAllProd);
        }).catch((err)=>console.log(err))
    },[])

    const productByCategory=(cat_id)=>{
        setCatalog(null)
        if(cat_id < 0) {
            Axios.get(`${API_URL_SQL}/admin/getproductbypage/${page}`)
            .then((res)=>{
                setCatalog(res.data)
            }).catch((err)=>console.log(err))
        } else {
            Axios.get(`${API_URL_SQL}/admin/getproductbycategory?categId=${cat_id}&page=${page}`)
            .then((res)=>{
                Axios.get(`${API_URL_SQL}/admin/getCategProductCount?categID=${cat_id}`)
                .then((res2)=> {
                    setCatalog(res.data)
                    setcountCateg(res2.data[0].countbyCateg)
                }).catch((err)=>console.log(err))
            }).catch((err)=>console.log(err))
        }
    }

    const renderCategory=()=>{
        return categories.map((val,index)=>{
            return (
                <li onClick={()=> {
                    setpage(1)
                    localStorage.setItem('catID', JSON.stringify(val.category_id))
                    productByCategory(val.category_id)
                }}>{val.category_name}</li>
            )
        })
    }
    
    const debouncedSave = useRef(
        debounce((nextValue)=>setSearchKey(nextValue),1000)
    ).current 
    
    
    const getItemfromSearch=(event)=>{
        const {value:nextValue} = event.target
        debouncedSave(nextValue)
    }

    useEffect(()=>{
        console.log(searchKey)
        let newCatid = localStorage.getItem('catID')
        if(newCatid) {
            Axios.get(`${API_URL_SQL}/admin/getproductbycategory?categId=${newCatid}&page=${page}`)
            .then((res)=>{
                Axios.get(`${API_URL_SQL}/admin/getCategProductCount?categID=${newCatid}`)
                .then((res2)=> {
                    setCatalog(res.data)
                    setcountCateg(res2.data[0].countbyCateg)
                }).catch((err)=>console.log(err))
            }).catch((err)=>console.log(err))
        } else {
            Axios.get(`${API_URL_SQL}/admin/getproductbypage/${page}`)
            .then((res)=>{
                setCatalog(res.data)
                console.log(res.data);
            }).catch((err)=>console.log(err))
        }
    },[page])

    if(categories===null || catalog===null){
        return (
            <div>Loading</div>
        )
    }

    const nextProd = () => {
        let newPage = page
        newPage++
        setpage(newPage)
    }

    const prevProd = () => {
        let newPage = page
        newPage--
        setpage(newPage)
    }

    console.log(page, 'page');
    console.log(countAll, 'allprodcount');
    console.log(countAll/6, 'count');
    console.log(countCateg, 'categprodcount');
    console.log(6/countCateg, 'countcateg');

    return (
        <div className="section-product" id="product">
            <div className="title-text center-text">
                <h3>Product</h3>
            </div>
            <div className="container">
                <div className="nav-category">
                    <ul>
                        <div>
                            <li className='active' onClick={()=> {
                                setcountCateg(100)
                                localStorage.removeItem('catID')
                                productByCategory(-1)
                            }}>All</li>
                            {renderCategory()}
                        </div>
                        <div>
                            <li>
                                <div className="search-bar">
                                    <input type="text" value={searchKey} onChange={getItemfromSearch} name="search" autoComplete="off" placeholder="Search.."/>
                                </div>
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
            <div className='d-flex flex-row'>
                {
                    page > 1?
                    <div onClick={prevProd} className='arrow-section'><i className="fas fa-chevron-left arrow-move"></i></div>
                    :
                    null
                }
                <div className="list-product mb-5">
                    <CardCustom catalog={catalog}/>
                </div>
                {
                    page >= (countAll/6) || page <= (6/countCateg)?
                    null
                    :
                    <div onClick={nextProd} className='arrow-section'><i className="fas fa-chevron-right arrow-move"></i></div>
                }
            </div>
        </div>
    )
}

export default Product