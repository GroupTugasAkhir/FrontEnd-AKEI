import React, { useEffect, useState } from 'react';
import './admin.css'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Settings } from '@material-ui/icons';
import Axios from 'axios';
import {API_URL_SQL} from './../../helpers/apiurl'

const uriPic = {
    chair: 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
    sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
    table: 'https://images.unsplash.com/photo-1602009445825-70e98455ea7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
  }
  
  const data = [
    {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    // {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
    // {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  ]

const InventoryLog = () => {
    const [trackInventLog, settrackInventLog] = useState([])

    useEffect(()=> {
        Axios.get(`${API_URL_SQL}/admin/getWHTrackingLog`)
        .then((res)=> {
            settrackInventLog(res.data)
        }).catch(err=> {
            console.log(err);
        })
    },[])

    const renderTableInventory=()=>{
        return trackInventLog.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>{val.product_name}</td>
            <td>{val.location_name}</td>
            <td>{val.quantity}</td>
            <td>{val.date_in}</td>
            <td>{val.notes === null? val.status : val.notes}</td>
          </tr>
        ))
    }

    // const renderTableInventory=()=>{
    //     return data.map((val, index)=>(
    //       <tr key={index}>
    //         <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
    //         <td>{val.name}</td>
    //         <td>Gudang BSD</td>
    //         <td> {index %2 == 0 ? '10 pcs' : '-5 pcs'}</td>
    //         <td>10 Januari 2020  11:44:55</td>
    //         <td>to Gudang Bekasi</td>
    //       </tr>
    //     ))
    // }


    return ( 
        <div style={{paddingTop:10}}>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Product</th>
                        <th>Ware House</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        <th style={{width:300}}>Status</th>
                    </tr>
                </thead>
                <tbody>
                {renderTableInventory()}
                </tbody>
            </Table>
            <div className='table_footer'>
            <Pagination aria-label="Page navigation example">
                <PaginationItem>
                    <PaginationLink first href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink previous href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    1
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    2
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink href="#">
                    3
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink next href="#" />
                </PaginationItem>
                <PaginationItem>
                    <PaginationLink last href="#" />
                </PaginationItem>
            </Pagination>
            </div>
        </div>
    );
}
 
export default InventoryLog;