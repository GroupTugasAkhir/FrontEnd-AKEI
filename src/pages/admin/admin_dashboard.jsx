import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PieChart from './../../component/PieChart/PieChart'
import './admindashboard.css'
import { API_URL_SQL } from '../../helpers';


const AdminDashboard = () => {

    const [user,setUser] = useState(null)
    const [product,setProduct] = useState(null)
    const [branch,setBranch] = useState(null)

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/report/getuser`)
        .then((res)=>{
            let temp = res.data[0][0].user_qty - res.data[1][0].user_qty 
            let obj = {
                legend : ['Active User','Not Active'],
                raw_data : [res.data[1][0].user_qty,temp],
                title : 'User count'
            }
            let var_color = []
            for(let i=0;i<obj.legend.length;i++){
                var_color[i] = randomCssRgba()
            }
            obj = {...obj,color:var_color}
            console.log(obj)
            setUser({obj})
        }).catch((err)=>console.log(err))
        Axios.get(`${API_URL_SQL}/report/getproduct`)
        .then((res)=>{
            let products = res.data
            let legend = [] 
            let raw_data = []
            let color = []
            products.map((val,index)=>{
                legend[index] = val.product_name
                raw_data[index] = val.qty
                color[index] = randomCssRgba()
            })
            let obj = {
                legend,
                raw_data,
                color,
                title: 'Product Inventory'
            }
            setProduct({obj})
        })
        Axios.get(`${API_URL_SQL}/report/getbranch`)
        .then((res)=>{
            let branchs = res.data
            let legend = [] 
            let raw_data = []
            let color = []
            branchs.map((val,index)=>{
                legend[index] = val.location_name
                raw_data[index] = val.act_branch
                color[index] = randomCssRgba()
            })
            let obj = {
                legend,
                raw_data,
                color,
                title: 'Active Branch'
            }
            setBranch({obj})
        })
        
    },[])

    const randomNumber = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
    const randomByte = () => randomNumber(0, 255)
    const randomCssRgba = () => `rgba(${[randomByte(), randomByte(), randomByte(), 0.5].join(',')})`
    

    if(user === null){
        return <div>Loading</div>
    }
        
    return (
        <div className='dashboard-tab'>
            <div className="piechart-container">
                <div className="content-chart">
                    <PieChart data={user}/>
                </div>
                <div className="content-chart">
                    <PieChart data={product}/>
                </div>
                <div className="content-chart">
                    <PieChart data={branch}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard