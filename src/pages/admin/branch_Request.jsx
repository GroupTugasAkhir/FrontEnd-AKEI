import React, { useEffect, useState } from 'react';
import './admin.css'
import { Table, 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Add, Settings } from '@material-ui/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers';

const BranchRequest = () => {
    const [modal, setModal] = useState(false)
    const [data,setData] = useState(null)
    const [detail,setDetail] = useState([])

    useEffect(()=>{
        fetchData()
    },[])

    const fetchData=()=>{
        let getLocation = JSON.parse(localStorage.getItem('user'))
        Axios.post(`${API_URL_SQL}/notification/getRequest`,{
            location_id : getLocation.notes
        }).then((res)=>{
            console.log(res.data)
            console.log(getLocation.notes)
            setData(res.data)
        }).catch((err)=>console.log(err))
    }

    const toggle = () => setModal(!modal);

    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const onSettingClick=(prod_id,destination_id,req_qty,loc_name,loc_id,notif_id,notes)=>{
        console.log(loc_id)
        fetchDetail(prod_id,loc_id)
        if(detail.length){
            MySwal.fire({
                title: `Confirm request from ${loc_name} : ${req_qty} \n(stock : ${detail[0].stock}) ?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Confirm'
            }).then((result) => {
                if (result.isConfirmed) {
                    confirmRequest(notif_id,prod_id,loc_id,destination_id,req_qty,notes)
                    MySwal.fire(
                        'Confirm!',
                        `sent ${req_qty} items to ${loc_name}`,
                        'success'
                    )
                }
            })
        }
    }

    const fetchDetail=(prod_id,loc_id)=>{
        let obj = {
            product_id : prod_id,
            location_id : loc_id
        }
        console.log(obj)
        Axios.post(`${API_URL_SQL}/notification/requestNotificationDetail`,obj)
        .then((res)=>{
            setDetail(res.data)
            console.log(res.data)
        }).catch((err)=>console.log(err))
    }

    const confirmRequest=(notif_id,prod_id,loc_id,destination_id,mod_qty,notes)=>{
        let obj = {
            product_id : prod_id, 
            mod_qty,
            notification_id : notif_id,
            location_id : loc_id,
            destination_id,
            notes
        }
        // console.log(notes)
        Axios.post(`${API_URL_SQL}/notification/confirmrequest`,obj)
        .then(()=>{
            console.log('confirmed, check tbl_notif and product_detail')
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
                        val.from,
                        val.notification_id,
                        val.notes
                        )}
                    }>Details</button>
            </td>
          </tr>
        ))
    }

    if(data===null){
        return (
            <div>Loading</div>
        )
    }


    return ( 
        <div style={{paddingTop:10}}>
            <Table>
                <thead>
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