import React, { useEffect, useState } from 'react';
import './admin.css'
import { Table, 
    Pagination, 
    PaginationItem, 
    PaginationLink
} from 'reactstrap';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers';

const BranchRequest = () => {
    const [modal, setModal] = useState(false)
    const [data,setData] = useState(null)
    const [waiting,setWaiting] = useState(null)
    const [detail,setDetail] = useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=()=>{
        let getLocation = JSON.parse(localStorage.getItem('user'))
        Axios.post(`${API_URL_SQL}/notification/getRequest`,{
            location_id : getLocation.notes
        }).then((res)=>{
            setData(res.data)
            console.log(res.data)
            Axios.post(`${API_URL_SQL}/notification/getWaiting`,{
                location_id : getLocation.notes
            }).then((res)=>{
                setWaiting(res.data)
            }).catch((err)=>console.log(err))
        }).catch((err)=>console.log(err))
    }

    const MySwal = withReactContent(Swal)


    const onSettingClick=(prod_id,destination_id,req_qty,loc_name,loc_id,notif_id,notes,trx_detail)=>{
        console.log(loc_id)
        let location = JSON.parse(localStorage.getItem('user'))
        let obj = {
            product_id : prod_id,
            location_id : location.notes
        }
        console.log(obj)
        Axios.post(`${API_URL_SQL}/notification/requestNotificationDetail`,obj)
        .then((res)=>{
            setDetail(res.data)
            if(res.data[0].stock < req_qty){
                let branch_name
                let another_request_qty = req_qty - res.data[0].stock
                if(location.notes == 1) branch_name = "BSD"
                else if(location.notes == 2) branch_name = "Bekasi"
                else branch_name = "Pluit"
                MySwal.fire({
                    title: `Insufficient stock request from ${loc_name} : ${req_qty} \n(stock : ${res.data[0].stock})\n request to another branch (${branch_name})?`,
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Confirm'
                }).then((result) => {
                    if (result.isConfirmed) {
                        requestItem(prod_id,req_qty,trx_detail,location.notes,notif_id)
                        MySwal.fire(
                            'Confirm!',
                            `request ${another_request_qty} items to ${branch_name}`,
                            'success'
                        )
                    }
                })
            } else{
                if(res.data.length){
                    MySwal.fire({
                        title: `Confirm request from ${loc_name} : ${req_qty} \n(stock : ${res.data[0].stock}) ?`,
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Confirm'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            confirmRequest(notif_id,prod_id,loc_id,destination_id,req_qty,notes,trx_detail)
                            MySwal.fire(
                                'Confirm!',
                                `sent ${req_qty} items to ${loc_name}`,
                                'success'
                            )
                        }
                    })
                }
            }
        }).catch((err)=>console.log(err))
        
    }

    const confirmRequest=(notif_id,prod_id,loc_id,destination_id,mod_qty,notes,trx_detail)=>{
        let obj = {
            product_id : prod_id, 
            mod_qty,
            notification_id : notif_id,
            location_id : loc_id,
            destination_id,
            notes,
            transaction_detail_id : trx_detail
        }
        // console.log(notes)
        Axios.post(`${API_URL_SQL}/notification/confirmrequest`,obj)
        .then((res)=>{
            console.log(res.data)
            console.log('confirmed, check tbl_notif and product_detail')
            fetchData()
        }).catch((err)=>console.log(err))
    }

    const requestItem=(id,qty,trx_detail,location,notif_id)=>{
        Axios.post(`${API_URL_SQL}/notification/requestHandling`,{
            location_id : location,
            product_id : id,
            req_quantity : qty,
            transaction_detail_id : trx_detail,
            notification_id : notif_id
        }).then(()=>{
            console.log('sukses oi')
            fetchData()
        }).catch((err)=>console.log(err))
    }

    const renderTableInventory=()=>{
        return data.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>
                <div style={{maxWidth:'100px'}}>
                    <img width='100%' height='100%'  src={API_URL_SQL+val.image}/>
                </div>
            </td>
            <td>{val.product_name}</td>
            <td>{val.req_qty}</td>
            <td>{val.location_name}</td>
            <td className='to-hover'>
                <button className='btn btn-outline-info mr-3' onClick={()=>{
                    onSettingClick(
                        val.product_id,
                        val.destination,
                        val.req_qty,
                        val.location_name,
                        val.froms,
                        val.notification_id,
                        val.notes,
                        val.transaction_detail_id
                        )}
                    }>Details</button>
            </td>
          </tr>
        ))
    }

    const renderTableWaiting=()=>{
        return waiting.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>
                <div style={{maxWidth:'100px'}}>
                    <img width='100%' height='100%'  src={API_URL_SQL+val.image}/>
                </div>
            </td>
            <td>{val.product_name}</td>
            <td>{val.req_qty}</td>
            <td> requesting to another branch</td>
          </tr>
        ))
    }

    if(data===null && waiting===null){
        return (
            <div>Loading</div>
        )
    }


    return ( 
        <div style={{paddingTop:10}}>
            <Table>
                {
                    typeof data === "object"?
                    <>
                        <thead>
                            <h5>Confirmation Request</h5>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Request Stock</th>
                                <th>Request by</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderTableInventory()}
                        </tbody>
                    </>
                    : null
                }
                {
                    waiting?
                    <>
                        <thead>
                            <h5 className='mt-5 pt-5'>Waiting Confirmation</h5>
                            <tr>
                                <th></th>
                                <th>Image</th>
                                <th>Product</th>
                                <th>Request Stock</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                        {renderTableWaiting()}
                        </tbody>
                    </>
                    : null
                }
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
 
export default BranchRequest;