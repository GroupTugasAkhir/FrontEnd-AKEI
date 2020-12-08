import React, { useEffect, useState } from 'react';
import './admin.css'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {connect} from 'react-redux'
import { API_URL_SQL, dateFormatter } from '../../helpers';
import Axios from 'axios';

const ActivityLog = (props) => {
    const [trackActivityLog, settrackActivityLog] = useState([])

    useEffect(()=> {
        fetchData()
    },[])

    const fetchData = () => {
        Axios.get(`${API_URL_SQL}/admin/getWHActivityLog?userLoc=${props.Auth.notes}`)
        .then((res)=> {
            settrackActivityLog(res.data)
        }).catch(err=> {
            console.log(err);
        })
    }

    const renderTableActivity=()=>{
        return trackActivityLog.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>{val.product_name}</td>
            <td>{val.trxqty}</td>
            <td>{dateFormatter(parseInt(val.date_in))}</td>
            <td>{val.fromLoc}</td>
            <td>{val.destLoc}</td>
            <td>{val.status}</td>
          </tr>
        ))
    }

    return (
        <div style={{paddingTop:10}}>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th>From</th>
                        <th>Destination</th>
                        <th style={{width:300}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                {renderTableActivity()}
                </tbody>
            </Table>
            <div className='table_footer d-flex justify-content-center align-items-center'>
                <Pagination aria-label="Page navigation example">
                    {/* {renderPage()} */}
                </Pagination>
            </div>
        </div>
    )
}

const Mapstatetoprops = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(Mapstatetoprops)(ActivityLog)