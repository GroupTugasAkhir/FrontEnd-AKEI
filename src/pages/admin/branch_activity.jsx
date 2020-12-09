import React, { useEffect, useState } from 'react';
import './admin.css'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import {connect} from 'react-redux'
import { API_URL_SQL, dateFormatter } from '../../helpers';
import Axios from 'axios';

const ActivityLog = (props) => {
    const [trackActivityLog, settrackActivityLog] = useState([])
    const [page, setpage] = useState(1)
    const [countPage, setcountPage] = useState('')

    useEffect(()=> {
        fetchData()
    },[])

    useEffect(()=> {
        fetchData()
    },[page])

    const fetchData = () => {
        Axios.get(`${API_URL_SQL}/admin/getWHActivityLog?userLoc=${props.Auth.notes}&page=${page}`)
        .then((res)=> {
            settrackActivityLog(res.data.activityRes)
            setcountPage(res.data.countAct[0].amountofact)
        }).catch(err=> {
            console.log(err);
        })
    }

    const movePage = (value) => {
        setpage(value)
    }

    const renderPage = () => {
        let amountPage = Math.ceil(countPage/5)
        let arr = new Array(amountPage)
        for(let i=0; i<arr.length; i++) {
            if((i+1)===page) {
                arr[i] = (
                    <PaginationItem key={i} disabled>
                        <PaginationLink >
                            {i+1}
                        </PaginationLink>
                    </PaginationItem>
                )
            } else {
                arr[i] = (
                    <PaginationItem key={i} onClick={()=>movePage(i+1)} >
                        <PaginationLink >
                            {i+1}
                        </PaginationLink>
                    </PaginationItem>
                )
            }
        }
        return arr
    }

    const renderTableActivity=()=>{
        return trackActivityLog.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>{val.product_name}</td>
            <td>{val.quantity}</td>
            <td>{dateFormatter(parseInt(val.date_in))}</td>
            <td>{val.status}</td>
            <td>{val.notes}</td>
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
                        <th>Status</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody>
                {renderTableActivity()}
                </tbody>
            </Table>
            <div className='table_footer d-flex justify-content-center align-items-center'>
                <Pagination aria-label="Page navigation example">
                    {renderPage()}
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