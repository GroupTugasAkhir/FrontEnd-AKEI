import React, { useState } from 'react';
import './style.css'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import { priceFormatter } from '../../helpers/priceFormatter';
import { API_URL_SQL } from '../../helpers/apiurl';
import { Link } from 'react-router-dom';

const CardCustom=(props)=>{

    const [dataCatalog,setDataCatalog] = useState(props.catalog)

    const renderCatalog=()=>{
        return dataCatalog.map((val,index)=>{
            return (
                <div className="card-box">
                    <div className="cart-icon">
                        <Link to={"/detailproduct/"+val.product_id}>
                            <AddShoppingCartIcon fontSize="small"/>
                        </Link>
                    </div>
                    <div className="card-text">
                        <div className="card-title">
                            <h6>{val.product_name}</h6>
                        </div>
                        <div className="card-price">
                            {priceFormatter(val.price)}
                        </div>
                    </div>
                    <div className="card-img">
                        <img src={API_URL_SQL+val.image} alt=""/>
                    </div>
                </div>
            )
        })
    }

    if(dataCatalog===null){
        return (
            <div>Loading</div>
        )
    }

    return renderCatalog()
}

export default CardCustom