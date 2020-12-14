import React, { useState , useEffect, useRef} from 'react';
import './style.css'
import { connect } from 'react-redux';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios'
import { API_URL_SQL, priceFormatter, dateFormatter} from '../../helpers';
import Avatar from '@material-ui/core/Avatar';
import { useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    padding: {
        padding: theme.spacing(1),
      },
    demo1: {
    //   backgroundColor: theme.palette.background.paper,
        backgroundColor: '#F7F3F2',
        paddingTop: 10,
        paddingLeft: 40,
        borderRadius:15
    },
    demo2: {
        backgroundColor: '#2e1534',
    },
    typography: {
        padding: theme.spacing(1),
    },
}));

// const AntTabs = withStyles({
//     root: {
//       borderBottom: '0px solid #e8e8e8',
//     },
//     indicator: {
//       backgroundColor: '#72ceb8',
      
//     },
// })(Tabs);
  
// const AntTab = withStyles((theme) => ({
//     root: {
//       textTransform: 'none',
//       minWidth: 72,
//       fontSize: 18,
//       fontWeight: theme.typography.fontWeightRegular,
//       marginRight: theme.spacing(4),
//       fontFamily: [
//         '-apple-system',
//         'BlinkMacSystemFont',
//         '"Segoe UI"',
//         'Roboto',
//         '"Helvetica Neue"',
//         'Arial',
//         'sans-serif',
//         '"Apple Color Emoji"',
//         '"Segoe UI Emoji"',
//         '"Segoe UI Symbol"',
//       ].join(','),
//       '&:hover': {
//         opacity: 1,
//       },
//       '&$selected': {
//         color: '#72ceb8',
//         fontWeight: theme.typography.fontWeightMedium,
//         border: 'none'
//       },
//       '&:focus': {
//         color: '#72ceb8',
//         border: 'none'
        
//       },
//     },
//     selected: {},
// }))((props) => <Tab disableRipple {...props} />);



const OnGoing = (props) => {
    // console.log(props)
    const classes = useStyles();
    const history = useHistory()
    const [value, setValue] = React.useState(0);
    const [modal, setModal] = useState(false);
    const [modalViewRating, setModalViewRating] = useState(false);
    const [rating, setRating] = useState(0)
    const [ratingprod, setratingprod] = useState('')
    const [orderDatas, setOrderDatas] = useState([])
    const [currentOrder, setcurrentOrder] = useState(0)
    const [currentRating, setcurrentRating] = useState([])
    const [filter, setFilter] = useState([])
    const [switchRender, setSwitchRender] = useState(false)
    const comment = useRef()

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/orders/getOrders/${props.user_id}`)
        .then((res)=>{
            setOrderDatas(res.data)
        }).catch((err)=>console.log(err))
    },[])

    const toggle = () =>{
        setModal(!modal)
    }

    const toggleViewRating = () =>{
        setModalViewRating(!modalViewRating)
    }

    // const handleChange = (event, newValue) => {
    //     setValue(newValue);
    // };

    const changeRating=(newRating, name)=>{
        console.log(newRating)
        setRating(newRating)
        // console.log(rating)
    }

    const onReceivedClick=(idTD)=>{
        Axios.get(`${API_URL_SQL}/orders/getCurrentOrder/${idTD}`)
        .then((res)=>{
            setcurrentOrder(res.data)
            toggle()
        }).catch((err)=>console.log(err))
    }

    const onCompleteClick=()=>{
        var data = {
            rating: rating,
            comment: comment.current.value,
            user_id: props.user_id,
            product_id: currentOrder.product_id,
            transaction_id: currentOrder.transaction_id,
            transaction_detail_id: currentOrder.transaction_detail_id,
            location_id: currentOrder.location_id,
            date_in: Date.now()
        }
        console.log(data)
        Axios.post(`${API_URL_SQL}/orders/completeOrder`, data)
        .then((res)=>{
            setOrderDatas(res.data.dataOrdersUser)
            toggle()
            Swal.fire(
                `Success! !`,
                `You gave ${rating}/5 rating`
            )
            
        }).catch((err)=>console.log(err))
    }

    const seeRating=(idPr)=>{
        console.log(idPr, props.user_id)
        Axios.get(`${API_URL_SQL}/orders/getRating/${props.user_id}/${idPr}`)
        .then((res)=>{
            setcurrentRating(res.data)
            setratingprod(res.data[0].product_name)
            console.log(res.data)
            toggleViewRating()
        }).catch((err)=>console.log(err))
    }

    const filterSearch=(input)=>{
        var filterdata = orderDatas.filter((val, index)=>{
            return val.product_name.toLowerCase().includes(input.toLowerCase())|| val.date_in.includes(input)
        })
        setFilter(filterdata)
    }

    const onChangeSearch=(e)=>{
        if(e.target.value){
            setSwitchRender(true)
            filterSearch(e.target.value)
        }else{
            setSwitchRender(false)
        }
    }

    const renderOrderCard=(arr)=>{
        return arr.map((val, index)=>(
            <div className='order-box' key={index}>
                <div className='order-header'>
                    <div style={{display:'flex', flexDirection:'row', alignItems:'flex-end'}}>
                        <div style={{fontSize:22, fontWeight:500, color:' #72ceb8', paddingRight:10}}>
                            {
                                val.status == 'waitingAdminConfirmation' ? 
                                'Confirming your payment'
                                : val.status == 'paymentCompleted' ?
                                'Payment confirmed'
                                : val.status_log == 'completed' ?
                                'Received'
                                : val.status == 'productOTW' ?
                                'On your way'
                                : 'Delivered'
                            }
                        </div>
                        <div style={{fontSize:15, paddingBottom:2}}>
                            {dateFormatter(parseInt(val.date_log))}
                        </div>
                    </div>
                    <div>
                        Transaction ID: {val.date_in}
                    </div>
                </div>
                <div className='order-content'>
                    <div className='order-top'>
                        <div>
                            <img width={80} height={80} style={{borderRadius:10, objectFit:'scale-down'}} src={API_URL_SQL + val.image} alt="AKEI"/>
                        </div>
                        <div className='order-detail pl-3'>
                            <div className='order-name' style={{fontSize:18}}>
                                {val.product_name}
                            </div>
                            <div className='order-name'>
                                x {val.quantity}
                            </div>
                        </div>
                    </div>
                    <div className='order-price' style={{fontSize:18}}>
                        {priceFormatter(val.price)}
                    </div>
                </div>
                <div className='order-content-bottom-box' style={
                        // val.status !== 'sentToUser' && val.status_log !== 'completed' ?
                        // {justifyContent:'flex-end'} 
                        // : val.status !== 'sentToUser' ? 
                        // null
                        // : null
                        val.status == 'sentToUser' && val.status_log == 'completed' ? 
                        null
                            : val.status == 'sentToUser' ? 
                            null
                            : {justifyContent:'flex-end'}
                    }>
                        {
                            val.status == 'sentToUser' && val.status_log == 'completed' ? 
                            <div>
                                <div style={{fontSize:12, color:'black', marginTop:-5}}>
                                    **please confirm receive other product to complete this transaction
                                </div>
                                <div className='order-bottom-txt' style={{marginTop:5}}>
                                    <button className='see-rating-button' onClick={()=>seeRating(val.product_id)}>See Product Rating</button>
                                </div>
                            </div>
                            : val.status == 'sentToUser' ? 
                            <div className='order-bottom-txt'>
                                <button onClick={()=>onReceivedClick(val.transaction_detail_id)} className='complete-button'>Received</button>
                            </div>
                            : null

                        }
                    
                    <div className='order-content-bottom' >
                        <div className='order-bottom-txt' style={{fontSize:19}}>
                            Total pesanan:
                        </div>
                        <div className='order-bottom-txt ml-2' style={{fontSize:30, fontWeight:500, color:'#72ceb8'}}>
                            {priceFormatter(val.quantity*val.price)}
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    return ( 
        <div>
            {/* Modal saat klik receive, untuk rating barang*/}
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Rate {currentOrder.product_name}</ModalHeader>
                <ModalBody>
                    <div>
                        <StarRatings
                            rating={rating}
                            starRatedColor="red"
                            changeRating={changeRating}
                            numberOfStars={5}
                            name='rating'
                            starDimension='30px'
                        />
                        <textarea ref={comment} className='form-control mt-2' cols='30' rows='7' placeholder='Write your comment'></textarea>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="complete-button" onClick={onCompleteClick}>Complete</button>{' '}
                    <button className="cancel-button" onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>

            {/* Modal untuk lihat rating barang yang udah di receive */}
            <Modal isOpen={modalViewRating} toggle={toggleViewRating}>
                <ModalHeader toggle={toggleViewRating}>{ratingprod} Rating</ModalHeader>
                <ModalBody>
                    {
                        currentRating.map((val, index)=>(
                            <div className='rating-bottom mb-2'>
                                <Avatar className='mr-2' alt='AKEI' src={val.photo} />
                                <div>
                                    <div>
                                        {val.username}
                                    </div>
                                    <div style={{marginTop:-10}}>
                                        <StarRatings
                                            rating={rating}
                                            starEmptyColor="red"
                                            numberOfStars={val.rating}
                                            name='rating'
                                            starDimension='10px'
                                            starSpacing='1px'
                                        />
                                    </div>
                                    <div>
                                        {val.comment_content}
                                    </div>
                                    <div style={{fontSize:13, color:'gray'}}>
                                        {dateFormatter(parseInt(val.date_in))}
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </ModalBody>
                <ModalFooter>
                    <button className="cancel-button" onClick={toggleViewRating}>Cancel</button>
                </ModalFooter>
            </Modal>
            <input style={{borderRadius:10}} className='my-3 form-control' type="text" 
            placeholder='Search by product name or transaction ID' onChange={onChangeSearch} />
            { switchRender ? renderOrderCard(filter) : renderOrderCard(orderDatas)}
        </div>
     );
}
 
const MapstatetoProps=({Auth})=>{
    return {
      ...Auth, role: Auth.role
    }
}
  
export default connect(MapstatetoProps, {}) (OnGoing);