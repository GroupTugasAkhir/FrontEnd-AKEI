import React, { useEffect, useState } from 'react';
import './admin.css'
import Header from './../../component/HeaderAdmin'
import {API_URL_SQL, dateFormatter, priceFormatter} from './../../helpers'
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
import Axios from 'axios'

const uriPic = {
  chair: 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  table: 'https://images.unsplash.com/photo-1602009445825-70e98455ea7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
}

const bukti_trans = 'https://1.bp.blogspot.com/-aDTJn_UbwsI/XpV8pKryEuI/AAAAAAAACs8/JI_uvQxkPYc2bzIrokHLaCGdYcIIku4CgCLcBGAsYHQ/s1600/Langkah%2Bterakhi.JPG'

const data = [
  {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
]

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

const TransactionLog = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [page, setPages] = useState(1)
    const [showProd, setShowProd] = useState(1)
    const [allTrx, setAllTrx] = useState([])
    const [trxDetById, setTrxDetById] = useState([])
    const [trxTrackingById, setTrxTrackingById] = useState([])
    const [paymentProof, setPaymentProof] = useState({})
    const [procurement, setProcurement] = useState([])
    const [procurementName, setProcurementName] = useState('')
    // const [allTrxDetail, setAllTrxDetail] = useState([])
    // const [allTotalPrice, setAllTotalPrice] = useState([])
    const [totalPriceTrx, setTotalPriceTrx] = useState(0)
    const [wareHouseTrx, setWareHouseTrx] = useState('')
    const [productWH, setProductWH] = useState([])
    const [idWHTrx, setIdWHTrx] = useState(0)
    const [idTrx, setIdTrx] = useState(0)
    const [realQty, setRealQty] = useState(0)
    const [modal, setModal] = useState(false)
    const [modalPayment, setModalPayment] = useState(false)
    const [modalTracking, setModalTracking] = useState(false)
    const [modalProcurement, setModalProcurement] = useState(false)


    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/admin/getTrxUser`)
        .then((res)=>{
            console.log(res.data)
            setAllTrx(res.data)
        }).catch((err)=>console.log(err))
    },[])

    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    const toggle = () => setModal(!modal);
    const togglePayment = () => setModalPayment(!modalPayment);
    const toggleTracking = () => setModalTracking(!modalTracking);
    const toggleProcurement = () => setModalProcurement(!modalProcurement);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    const id = open ? 'simple-popover' : undefined;

    const onAcceptPaymentClick = (id) => {
        console.log(id)
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Accept!'
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.put(`${API_URL_SQL}/admin/acceptPaymentTrf/${id}`)
                .then((res)=>{
                    setAllTrx(res.data)
                    togglePayment()
                    Swal.fire(
                        'Accepted!',
                        'Payment has been accepted.'
                    )
                }).catch((err)=>console.log(err))
            }
        })
    }

    const onRejectPaymentClick = () => {
        MySwal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, reject it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                Axios.put(`${API_URL_SQL}/admin/acceptPaymentTrf/${id}`)
                .then((res)=>{
                    setAllTrx(res.data)
                    togglePayment()
                    swalWithBootstrapButtons.fire(
                        'Rejected!',
                        'Payment has been rejected.',
                    )
                }).catch((err)=>console.log(err))
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                togglePayment()
                swalWithBootstrapButtons.fire(
                  'Cancelled',
                  'Please check the payment proof again!'
                )
            }
        })
    }

    const onClickToSeeDetail=(idTrans)=>{
        Axios.get(`${API_URL_SQL}/admin/getTrxDetailById/${idTrans}`)
        .then((res)=>{
            setTrxDetById(res.data)
            toggle()
        }).catch((err)=>console.log(err))
    }

    const actionPaymentCompleted=(idTrans, idLoc)=>{
        Axios.get(`${API_URL_SQL}/admin/getTrxTrackingById/${idTrans}/${idLoc}`)
        .then((res)=>{
            setTrxTrackingById(res.data)
            toggleTracking()
        }).catch((err)=>console.log(err))
    }

    const actionConfirmPayment=(idTrans)=>{
        console.log(idTrans)
        Axios.get(`${API_URL_SQL}/admin/getPaymentCheck/${idTrans}`)
        .then((res)=>{
            setPaymentProof(res.data.dataPaymentCheck)
            console.log(paymentProof)
            togglePayment()
        }).catch((err)=>console.log(err))
    }

    const onActionProcurement=(idTransDet, prodName)=>{
        console.log(idTransDet)
        Axios.get(`${API_URL_SQL}/admin/getSupplyFlow/${idTransDet}`)
        .then((res)=>{
            setProcurement(res.data)
            setProcurementName(prodName)
            console.log(procurement)
            // console.log(res.data)
            toggleProcurement()
        }).catch((err)=>console.log(err))
    }

    const renderTable=()=>{
        // console.log(allTrx)
        return allTrx.map((val, index)=>(
            <tr key={index}>
                <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
                <td>{val.username}</td>
                <td>{dateFormatter(parseInt(val.date_in))}</td>
                <td>{priceFormatter(val.total_price)}</td>
                <td>{val.method}</td>
                <td>{val.location_name}</td>
                <td onClick={()=>onClickToSeeDetail(val.transaction_id)} className='to-hover'>
                        click to see detail..
                </td>
                <td>{val.status}</td>
                <td className='to-hover' 
                    onClick={()=>{
                        val.status == 'waitingAdminConfirmation' ? 
                        actionConfirmPayment(val.transaction_id) 
                        : actionPaymentCompleted(val.transaction_id, val.location_id)
                    }}>
                    <Settings/>
                </td>
            </tr>
      ))
    }

    const renderTotalHarga=()=>{
        var total= trxDetById.reduce((total, num)=>{
            return total + (num.price * num.quantity)
        },0)

        return priceFormatter(total)
    }

    // console.log(trxDetById)

    const renderProductDetail=()=>(
        <Paper >
            <TableContainer >
                <TableUI stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Qty</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Sub Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {trxDetById.map((val, index)=>{
                            return (
                                <TableRow key={index} hover={true}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell >
                                        <div style={{maxWidth:'100px'}}>
                                            <img width='100%' height='100%'  src={API_URL_SQL + val.image}/>
                                        </div>
                                    </TableCell>
                                    <TableCell>{val.product_name}</TableCell>
                                    <TableCell>{val.quantity}</TableCell>
                                    <TableCell>{priceFormatter(val.price)}</TableCell>
                                    <TableCell>{priceFormatter(val.price*val.quantity)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>Total Harga</TableCell>
                        <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>
                            {renderTotalHarga()}
                        </TableCell>
                    </TableFooter>
                </TableUI>
            </TableContainer>
        </Paper>
    )
   

    const renderTrackingDetail=()=>(
        <Paper >
            <TableContainer >
                <TableUI stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Image</TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Order Qty</TableCell>
                            <TableCell>Stock Available</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            trxTrackingById.map((val, index)=>(
                                <TableRow key={index} hover={true}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell >
                                        <div style={{maxWidth:'100px'}}>
                                            <img width='100%' height='100%'  src={API_URL_SQL + val.image}/>
                                        </div>
                                    </TableCell>
                                    <TableCell>{val.product_name}</TableCell>
                                    <TableCell>{val.quantity}</TableCell>
                                    <TableCell>{val.stock_warehouse ? val.stock_warehouse : 0}</TableCell>
                                    <TableCell>{val.quantity <= val.stock_warehouse ? 'ready' : 'insufficient'}</TableCell>
                                    <TableCell className='to-hover' onClick={()=>onActionProcurement(val.transaction_detail_id, val.product_name)}>
                                        procurement detail...
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableUI>
            </TableContainer>
        </Paper>
    )

    const renderProcurementDetail=()=>(
        <Paper >
            <TableContainer >
                <TableUI stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            <TableCell>No.</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Procurement Activity</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            procurement.map((val, index)=>(
                                <TableRow key={index} hover={true}>
                                    <TableCell>{index+1}</TableCell>
                                    <TableCell>{dateFormatter(parseInt(val.date_in))}</TableCell>
                                    <TableCell>
                                        {
                                            
                                            val.from == 0 && val.status=='request' ?
                                            `Waiting ${val.destination_name} Confirmation`
                                            : val.from == 0 && val.status=='confirm' ?
                                             `${val.destination_name} has confirmed`
                                            : val.status=='request' ?
                                             `Requesting to ${val.destination_name}`
                                            : val.status=='confirm' ?
                                             `Accepted, ${val.destination_name} sending supply`
                                            : 'Sent to user'
                                        }
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TableUI>
            </TableContainer>
        </Paper>
    )
    
    return ( 
        <div style={{paddingTop:10}}>

            {/* Modal untuk lihat detail pembelanjaan user */}
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Product Detail</ModalHeader>
                <ModalBody>
                    {renderProductDetail()}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>OK</Button>
                </ModalFooter>
            </Modal>

            {/* Modal untuk cek bukti transfer user */}
            <Modal isOpen={modalPayment} toggle={togglePayment} size='sm'>
                <ModalHeader toggle={togglePayment}>Payment Checking</ModalHeader>
                <ModalBody>
                    <div className='modal_payment_title'>
                            <div style={{fontWeight:'bold', fontSize:14}}>{paymentProof.username}</div>
                            <div style={{fontSize:14}}>{priceFormatter(paymentProof.total_price)}</div>
                        </div>
                        <div className='modal_payment_div'>
                            <img width='100%' height='100%' src={API_URL_SQL + paymentProof.payment_proof}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={()=>onAcceptPaymentClick(paymentProof.transaction_id)}>Accept</Button>{'  '}
                    <Button color="danger" onClick={()=>onRejectPaymentClick(paymentProof.transaction_id)}>Reject</Button>
                </ModalFooter>
            </Modal>

            {/* Modal untuk tracking transaksi dari user */}
            <Modal isOpen={modalTracking} toggle={toggleTracking} size='xl'>
                <ModalHeader toggle={toggleTracking}>Tracking Transaction Quantity</ModalHeader>
                <ModalBody>
                    {renderTrackingDetail()}
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className="btn btn-outline-primary" onClick={toggleTracking}>back</button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* Modal untuk lihat procurement transaksi detail */}
            <Modal isOpen={modalProcurement} toggle={toggleProcurement} size='xl'>
                <ModalHeader toggle={toggleProcurement}>{procurementName} Procurement</ModalHeader>
                <ModalBody>
                    {renderProcurementDetail()}
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className="btn btn-outline-primary" onClick={toggleProcurement}>back</button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* Render component */}
            <Table hover>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
                        <th>Closest Warehouse</th>
                        <th>Product</th>
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
 
export default TransactionLog;