import React, { useEffect, useState } from 'react';
import './admin.css'
import Header from './../../component/HeaderAdmin'
import { Table, 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    CustomInput
} from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import ButtonUI from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TableUI from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableFooter} from '@material-ui/core'
import { 
    CameraAltOutlined, 
    Settings 
} from '@material-ui/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios';
import { API_URL_SQL } from '../../helpers';
import {connect} from 'react-redux'
import {ModalChange} from './../../redux/actions'

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(1),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    typography: {
      padding: theme.spacing(1),
    },
}));

const TransactionLog = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [page, setPages] = useState(1)
    const [showProd, setShowProd] = useState(1)
    const [modal, setModal] = useState(false)
    const [modalRequest, setModalRequest] = useState(false)
    const [modalTracking, setModalTracking] = useState(false)
    const [data,setData] = useState(null)
    const [trxData,setTrxData] = useState([])
    const [onPackage,setOnPackage] = useState([])
    const [onWaiting,setOnWaiting] = useState([])
    const [isValid,setIsValid] = useState(0)
    const [trxId,setTrxId] = useState(0)

    useEffect(()=>{
        if(props.Auth.isLogin){
            let getLocation = JSON.parse(localStorage.getItem('user'))
            if(getLocation) {
                Axios.get(`${API_URL_SQL}/notification/gettransaction/${getLocation.notes}`)
                .then((res)=>{
                    setData(res.data)
                }).catch((err)=>console.log(err))
            }
        }
    })

    // useEffect(()=> {
    //     if(props.Admin.adminData !== '') {    
    //         console.log(props.Admin.adminData);
    //         getTransactionDetail(props.Admin.adminData)
    //     }
    // },[props.Admin.adminData])

    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const toggle = () => setModal(!modal);
    const toggleRequest = () => setModalRequest(!modalRequest);
    const toggleTracking = () => setModalTracking(!modalTracking);

    const transactionModal = (trxid) => {
        localStorage.setItem('trxID', JSON.stringify(trxid))
        checkSendButton(trxid)
        getTransactionDetail(trxid)
        setTrxId(trxid)
    }

    const renderTable=()=>{
        return data.map((val, index)=>(
            <tr key={index} style={{textTransform:'capitalize'}}>
                <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
                <td>{val.username}</td>
                <td>{val.date_in}</td>
                <td>{val.status}</td>
                <td className='to-hover' onClick={()=>transactionModal(val.transaction_id)}><Settings/></td>
            </tr>
      ))
    }

    const getTransactionDetail=(id)=>{
        let getLocation = JSON.parse(localStorage.getItem('user'))
        console.log(id)
        console.log(getLocation.notes)
        let obj = {
            location_id : getLocation.notes,
            transaction_id : id
        }
        Axios.post(`${API_URL_SQL}/notification/gettransactiondetail`,obj)
        .then((res)=>{
            setTrxData(res.data[0])
            setOnPackage(res.data[1])
            setOnWaiting(res.data[2])
            setModalTracking(true)
        }).catch((err)=>console.log(err))
    }

    const confirmItem=(prod_id,qty,trx_detail)=>{
        let getLocation = JSON.parse(localStorage.getItem('user'))
        Axios.post(`${API_URL_SQL}/notification/confirmUserRequest`,{
            product_id : prod_id,
            mod_qty : qty,
            trx_detail_id : trx_detail,
            location_id : getLocation.notes
        }).then(()=>{
            console.log('sukses oi')
            let transacID = localStorage.getItem('trxID')
            props.ModalChange(transacID)
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
            let transacID = localStorage.getItem('trxID')
            props.ModalChange(transacID)
        }).catch((err)=>console.log(err))
    }

    const checkSendButton=(trx_id)=>{
        Axios.get(`${API_URL_SQL}/notification/checkitem/${trx_id}`)
        .then((res)=>{
            console.log(res.data)
            setIsValid(res.data)
        }).catch((err)=>console.log(err))
    }

    const sendItem=()=>{
        console.log(trxId)
        Axios.post(`${API_URL_SQL}/notification/senditem/${trxId}`)
        .then(()=>{
            console.log('item send')
            toggleTracking()
        }).catch((err)=>console.log(err))
    }

    const renderTrackingDetail=()=>(
        <Paper >
            <TableContainer >
                <TableUI stickyHeader aria-label="sticky table">
                    {
                        trxData.length?
                        <TableHead>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Order Qty</TableCell>
                                <TableCell>Stock</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Action</TableCell>
                            </TableRow>
                        </TableHead>
                        :
                        null
                    }
                    <TableBody>
                        {renderTrackingDetailTableBody()}
                    </TableBody>
                    {
                        onPackage.length?
                        <TableHead>
                            <h6 className='mt-3'>Confirmed</h6>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Order Qty</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        :
                        null
                    }
                    <TableBody>
                        {onPackage.length? renderOnPackage() : null}
                    </TableBody>
                    {
                        onWaiting.length?
                        <TableHead>
                            <h6 className='mt-3'>Waiting Confirmation</h6>
                            <TableRow>
                                <TableCell>No.</TableCell>
                                <TableCell>Image</TableCell>
                                <TableCell>Product</TableCell>
                                <TableCell>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        :
                        null
                    }
                    <TableBody>
                        {onPackage.length || onWaiting.length? renderOnWaiting() : null}
                    </TableBody>
                </TableUI>
            </TableContainer>
        </Paper>
    )

    const renderTrackingDetailTableBody=()=>{
        let getLocation = JSON.parse(localStorage.getItem('user'))
        return trxData.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div style={{maxWidth:'100px'}}>
                        <img width='100%' height='100%'  src={API_URL_SQL+val.image}/>
                    </div>
                </TableCell>
                <TableCell>{val.product_name}</TableCell>
                <TableCell>{val.req_qty}</TableCell>
                <TableCell>{val.stock}</TableCell>
                <TableCell>{val.req_qty <= val.stock? 'ready' : 'insufficient'}</TableCell>
                {
                    val.req_qty <= val.stock?
                    <TableCell className='to-hover'>
                        <button className='btn btn-outline-info mr-3' onClick={()=>confirmItem(val.product_id, val.req_qty,val.transaction_detail_id)}>Confirm</button>
                    </TableCell>
                    :
                    <TableCell className='to-hover'>
                        <button className='btn btn-outline-success mr-3' onClick={()=>requestItem(val.product_id, val.req_qty,val.transaction_detail_id,getLocation.notes,val.notification_id)}>Request</button>
                    </TableCell>
                }
            </TableRow>
        ))
    }

    const renderOnPackage=()=>{
        return onPackage.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div style={{maxWidth:'100px'}}>
                        <img width='100%' height='100%'  src={API_URL_SQL+val.image}/>
                    </div>
                </TableCell>
                <TableCell>{val.product_name}</TableCell>
                <TableCell>{val.req_qty}</TableCell>
                <TableCell>onPackaging</TableCell>
            </TableRow>
        ))
    }

    const renderOnWaiting=()=>{
        return onWaiting.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div style={{maxWidth:'100px'}}>
                        <img width='100%' height='100%'  src={API_URL_SQL+val.image}/>
                    </div>
                </TableCell>
                <TableCell>{val.product_name}</TableCell>
                <TableCell>onWaiting from another branch</TableCell>
            </TableRow>
        ))
    }

    if(data===null){
        return (
            <div>Loading</div>
        )
    }
    
    return ( 
        <div style={{paddingTop:10}}>

            {/* Modal untuk tracking transaksi dari user */}
            <Modal isOpen={modalTracking} toggle={toggleTracking} size='xl'>
                <ModalHeader toggle={toggleTracking}>Tracking Transaction Quantity</ModalHeader>
                <ModalBody>
                    {renderTrackingDetail()}
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        {
                            isValid?
                            <button className='btn btn-outline-info mr-3' onClick={sendItem}>Send</button>
                            :
                            null
                        }
                        <button className="btn btn-outline-primary" onClick={toggleTracking}>back</button>
                    </div>
                </ModalFooter>
            </Modal>
            {/* Render component */}
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {renderTable()}
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

const Mapstatetoprops = (state) => {
    return {
        Auth : state.Auth,
        Admin: state.Admin
    }
}

export default connect(Mapstatetoprops,{ModalChange})(TransactionLog);