import React, { useState } from 'react';
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
import {MenuItem, TableFooter} from '@material-ui/core'
import { 
    CameraAltOutlined, 
    Settings 
} from '@material-ui/icons';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

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
    const [modal, setModal] = useState(false)
    const [modalPayment, setModalPayment] = useState(false)
    const [modalTracking, setModalTracking] = useState(false)

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

    const onAcceptPaymentClick = () => {
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
                togglePayment()
                Swal.fire(
                    'Accepted!',
                    'Payment has been accepted.'
                )
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
                togglePayment()
                swalWithBootstrapButtons.fire(
                  'Rejected!',
                  'Payment has been rejected.',
                  'success'
                )
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

    const renderTable=()=>{
        return data.map((val, index)=>(
            <tr key={index}>
                <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
                <td>Username</td>
                <td>17 Oktober 2020  10:34:55 AM</td>
                <td>{val.price}</td>
                <td>
                    {index % 2 == 0 ? 'CC' :'Bank Transfer'}
                </td>
                <td onClick={toggle} className='modal_stock'>click to see detail..</td>
                <td>
                    {index % 2 == 0 ? 'on packaging' :'payment checking'}
                </td>
                <td className='to-hover' onClick={index % 2 != 0 ? togglePayment : toggleTracking }><Settings/></td>
            </tr>
      ))
    }

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
                        {renderProductDetailTableBody()}
                    </TableBody>
                    <TableFooter>
                        <TableCell colSpan={4}></TableCell>
                        <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>Subtotal Harga</TableCell>
                        <TableCell style={{fontWeight:'700', color:'black', fontSize:20}}>20.000.000</TableCell>
                    </TableFooter>
                </TableUI>
            </TableContainer>
        </Paper>
    )

    const renderProductDetailTableBody=()=>{
        return data.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div style={{maxWidth:'100px'}}>
                        <img width='100%' height='100%'  src={val.image}/>
                    </div>
                </TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell>5 pcs</TableCell>
                <TableCell>1.000.000</TableCell>
                <TableCell>5.000.000</TableCell>
            </TableRow>
        ))
    }

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
                            <TableCell>Closest WH</TableCell>
                            <TableCell>Stock Qty</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {renderTrackingDetailTableBody()}
                    </TableBody>
                </TableUI>
            </TableContainer>
        </Paper>
    )

    const renderTrackingDetailTableBody=()=>{
        return data.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div style={{maxWidth:'100px'}}>
                        <img width='100%' height='100%'  src={val.image}/>
                    </div>
                </TableCell>
                <TableCell>{val.name}</TableCell>
                <TableCell>4 pcs</TableCell>
                <TableCell>{index % 2 == 0 ? 'Bekasi' : 'Pluit'}</TableCell>
                <TableCell>{index % 2 == 0 ? '5 pcs' : '0 pcs'}</TableCell>
                <TableCell>{index % 2 == 0 ? 'ready' : 'requesting to BSD'}</TableCell>
            </TableRow>
        ))
    }
    
    return ( 
        <div style={{paddingTop:10}}>
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader toggle={toggle}>Product Detail</ModalHeader>
                <ModalBody>
                    {renderProductDetail()}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>OK</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalPayment} toggle={togglePayment} size='sm'>
                <ModalHeader toggle={togglePayment}>Payment Checking</ModalHeader>
                <ModalBody>
                    <div className='modal_payment_title'>
                        <div style={{fontWeight:'bold'}}>username</div>
                        <div>1.000.000</div>
                    </div>
                    <div className='modal_payment_div'>
                        <img width='100%' height='100%' src={bukti_trans}/>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={onAcceptPaymentClick}>Accept</Button>{'  '}
                    <Button color="danger" onClick={onRejectPaymentClick}>Reject</Button>
                </ModalFooter>
            </Modal>
            <Modal isOpen={modalTracking} toggle={toggleTracking} size='xl'>
                <ModalHeader toggle={toggleTracking}>Tracking Transaction Quantity</ModalHeader>
                <ModalBody>
                    {renderTrackingDetail()}
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggleTracking}>OK</Button>
                </ModalFooter>
            </Modal>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Username</th>
                        <th>Date</th>
                        <th>Total Price</th>
                        <th>Payment Method</th>
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