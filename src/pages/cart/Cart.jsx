import React, { useEffect, useRef, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {Modal, ModalHeader, ModalBody, ModalFooter, CustomInput} from 'reactstrap'
import Header from './../../component/header/Header'
import './style.css'
import {priceFormatter, API_URL_SQL, credit} from './../../helpers'
import Axios from 'axios'
import {connect} from 'react-redux'
import Swal from 'sweetalert2'
import {findNearest} from 'geolib'
import Empty from './../../assets/empty.png'


//testing
import testImg from './../../assets/mainregimg.jpg'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
  }))(TableCell);

const useStyles = makeStyles({
    table: {
      backgroundColor: 'white',
      color: 'white'
    },
  });

const Cart = (props) => {
    const isCancelled = useRef(false)
    const classes = useStyles();
    const [dataCart, setdataCart] = useState([])
    const [payModal, setpayModal] = useState(false)
    const [choiceMethod, setchoiceMethod] = useState(0)
    const ccPay = useRef()
    const [invoicePhoto, setinvoicePhoto] = useState(null)

    const [dataLocation, setdataLocation] = useState([])
    const [matchLoc, setmatchLoc] = useState({})
    const [longlat, setlonglat] = useState('')
    const [curloc, setcurloc] = useState(false)
    const [inputloc, setinputloc] = useState(false)
    const addressUser = useRef()

    useEffect(()=> {
        getCartData()

        return ()=> {
            isCancelled.current = true
        }
    },[])

    const getCartData = async () => {
        try {
            const {data} = await Axios.get(`${API_URL_SQL}/cart/getCart/${props.Auth.user_id}`)
            if(!isCancelled.current) {
                setdataCart(data.cartData)
                setdataLocation(data.locationData)
                console.log(data.locationData);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    //show current location start
    const geoLocation = () => {
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition)
        } else {
            alert('Geolocation is not supported by this browser.')
        }
    }
    
    const showPosition = (position) => {
        let latitude = position.coords.latitude
        let longitude = position.coords.longitude
        setlonglat(`${latitude}` + `,${longitude}`)

        const nearDist = findNearest({ latitude: latitude, longitude: longitude }, dataLocation);
        setmatchLoc(nearDist)
        console.log(nearDist);
    }
    //show current location end

    //address from user input start
    

    //address from user input end

    const plusBtn = (ind) => {
        const plusVar = [...dataCart]
        plusVar[ind].quantity += 1
        setdataCart(plusVar)

        Axios.post(`${API_URL_SQL}/cart/updateCart`,plusVar[ind])
        .then((res)=> {
            console.log(res.data);
        }).catch(err=> {
            console.log(err.response.data.message);
        })
    }

    const minBtn = (ind) => {
        const minVar = [...dataCart]
        minVar[ind].quantity -= 1
        setdataCart(minVar)

        if(minVar[ind].quantity < 1) {
            let idData = {
                idtrans: minVar[ind].idtrans,
                idprod: minVar[ind].idprod,
            }
            minVar.splice(ind, 1)

            Axios.post(`${API_URL_SQL}/cart/deleteCart`,idData)
            .then((res)=> {
                console.log(res.data);
            }).catch(err=> {
                console.log(err.response.data.message);
            })
        } else {
            Axios.post(`${API_URL_SQL}/cart/updateCart`,minVar[ind])
            .then((res)=> {
                console.log(res.data);
            }).catch(err=> {
                console.log(err.response.data.message);
            })
        }
    }

    const renderTotalPrice = () => {
        var total = dataCart.reduce((total, num)=> {
            return total + (num.price * num.quantity)
        }, 0)
        return total
    }

    const oninputFileChange = (e) => {
        if(e.target.files[0]) {
            setinvoicePhoto(e.target.files[0])
        } else {
            setinvoicePhoto(null)
        }
      }

    const onPayClick=()=>{
        if(choiceMethod === '1') {
            onPaywithInvoicePhoto()
        } else if(choiceMethod === '2') {
            if(credit(parseInt(ccPay.current.value))){
                onPaywithCreditCard()
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Your credit card is not valid!',
                  })
            }
        } else {
            Swal.fire(
                'Payment Methode?',
                'Choose your payment methode first!',
                'question'
              )
        }
    }

    const onPaywithInvoicePhoto = () => {
        console.log('onPaywithInvoicePhoto');
    }

    const onPaywithCreditCard = () => {
        console.log(dataCart[0].idtrans);
        console.log(ccPay.current.value);
        console.log(longlat);
        console.log(matchLoc);

        Axios.post(`${API_URL_SQL}/transaction/onpaycc`,{
            user_id: props.Auth.user_id,
            idtrans: dataCart[0].idtrans,
            payment_proof: ccPay.current.value,
            notes: longlat,
            matchLoc: matchLoc
        }).then((res)=> {
            if(res.data === 'berhasil') {
                setdataCart([])
                Swal.fire({
                    position: 'center-start',
                    icon: 'success',
                    title: 'Thank you for buying with AKEI!',
                    showConfirmButton: false,
                    timer: 1500
                  })
                setpayModal(false)
            }
        }).catch((err)=> {
            console.log(err.response.data.message);
        })
    }

    const renderCart = () => {
        return dataCart.map((val, ind)=> {
            return (
                <TableRow key={ind+1}>
                    <TableCell style={{width: '100px'}}>
                        <div className='cartimg'>
                            <img style={{objectFit: 'contain', objectPosition: '50% 50%'}} width='100%' height='100%' src={API_URL_SQL + val.image} alt={val.product_name} />
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className='cart-words-prod'>
                            {val.product_name}
                        </div> 
                    </TableCell>
                    <TableCell>
                        <div className='cart-words'>
                            {priceFormatter(val.price)}
                        </div>
                        </TableCell>
                    <TableCell>
                        <div className='d-flex'>
                            <button className='qty-button-minus' onClick={()=>minBtn(ind)}>-</button>
                            <div className='qty-area'>
                                {val.quantity}
                            </div>
                            <button className='qty-button-plus' onClick={()=>plusBtn(ind)}>+</button>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className='cart-words'>
                            {priceFormatter(val.price*val.quantity)}
                        </div>
                    </TableCell>
                </TableRow>            
            )
        })
    }

    const curlocationChange = () => {
        setcurloc(true)
        setinputloc(false)
        geoLocation()
    }

    const inputlocationChange = () => {
        setinputloc(true)
        setcurloc(false)
    }

    const toggle = () => {
        setpayModal(!payModal)
        setinvoicePhoto(null)
    }

    return (
        <>
            <Modal style={{marginTop:80}} isOpen={payModal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Payment</ModalHeader>
                <ModalBody>
                    <select onChange={(e)=> setchoiceMethod(e.target.value)} className='form-control' defaultValue={0} >
                        <option value="0" hidden>Choose your payment method</option>
                        <option value="1">Invoice Proof</option>
                        <option value="2">Credit Card</option>
                    </select>
                    {
                       choiceMethod === '2'?
                        <input type='number' className='form-control my-2' ref={ccPay} placeholder='input your credit card'/>
                        :
                       choiceMethod === '1'?
                       <div>
                           <CustomInput className='form-control my-2' onChange={oninputFileChange} type='file' label={invoicePhoto ? invoicePhoto.name : 'select invoice'} />
                           {
                               invoicePhoto?
                               <div className='mt-2'>
                                   <img src={URL.createObjectURL(invoicePhoto)} 
                                   height = '200' 
                                   width = '200' 
                                   alt = "invoice"/>
                               </div>
                               :
                               null
                           }
                       </div>
                        :
                        null
                    }
                </ModalBody>
                <ModalFooter>
                    <button onClick={onPayClick} className='checkout-button'>
                        Bayar
                    </button>
                </ModalFooter>
            </Modal>

            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div style={{marginTop: '80px', marginInline: '50px',marginLeft:'12vw',marginRight:'12vw'}} >
                <div className='cartsection'>
                    <div className='cart-left-side'>
                        <Paper elevation={0}>
                            <TableContainer>
                                {
                                    dataCart.length < 1 ?
                                    <div className="d-flex align-items-center justify-content-center flex-column" style={{overflow:'hidden'}}>
                                        <img src={Empty} alt="" style={{width:'400px', height:'400px',objectFit:'contain'}}/>
                                        <h4>Your cart is still empty</h4>
                                    </div>
                                    :
                                    <Table stickyHeader className={classes.table}>
                                        <TableHead>
                                            <TableRow>
                                                <StyledTableCell colSpan='2'>Product</StyledTableCell>
                                                <StyledTableCell>Price</StyledTableCell>
                                                <StyledTableCell>Quantity</StyledTableCell>
                                                <StyledTableCell>Total</StyledTableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {
                                                renderCart()
                                            }
                                        </TableBody>
                                    </Table>
                                }
                            </TableContainer>
                        </Paper>
                    </div>
                    <div className='cart-right-side'>
                        <div className='cart-right-side-section'>
                            <div className='right-top-side'>
                                <div style={{padding: '10px'}}>
                                    <h4>Order Summary</h4>
                                    <p style={{color: 'gray'}}>lorem ipsum</p>
                                </div>
                            </div>
                            <div className='right-bottom-side'>
                                <div className='checkout-side'>
                                    <div>
                                        <div style={{color: 'gray'}}>Total Price</div>
                                        <div>{priceFormatter(renderTotalPrice())}</div>
                                    </div>
                                    <button onClick={()=> setpayModal(true)} className='checkout-button'>Checkout</button>
                                </div>
                            </div>
                            {
                                dataCart.length?
                                <>
                                    <div className='d-flex justify-content-center align-items-center'>
                                        <h5 className='mb-2 mt-5'>Choose Payment Address</h5>
                                    </div>
                                    <div onClick={curlocationChange} className={curloc?'location-change':'current-location'}>
                                        Using current location
                                    </div>
                                    <div className={inputloc?'location-change':'input-location'}>
                                        <input onClick={inputlocationChange} ref={addressUser} type="text" placeholder='input your address'/>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

const Mapstatetoprops = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(Mapstatetoprops)(Cart)