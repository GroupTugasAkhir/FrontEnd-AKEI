import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import PieChart from './../../component/PieChart/PieChart'
import './admindashboard.css'
import { API_URL_SQL } from '../../helpers';


const AdminDashboard = () => {

    const [user,setUser] = useState(null)

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/report/getuser`)
        .then((res)=>{
            let temp = res.data[0][0].user_qty - res.data[1][0].user_qty 
            let obj = {
                legend : ['Active User','Not Active'],
                raw_data : [res.data[1][0].user_qty,temp]
            }
            let var_color = []
            for(let i=0;i<obj.legend.length;i++){
                var_color[i] = randomCssRgba()
            }
            // console.log(obj.legend.length)
            obj = {...obj,color:var_color}
            console.log(obj)
            setUser({obj})
        }).catch((err)=>console.log(err))
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
                    <PieChart data={user}/>
                </div>
                <div className="content-chart">
                    <PieChart data={user}/>
                </div>
            </div>
        </div>
    )
}

export default AdminDashboard