import React, { useState , useEffect, useRef} from 'react';
import './style.css'
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2'
import Axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import { API_URL_SQL, priceFormatter } from '../../helpers';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));



const OnGoing = (props) => {
    // console.log(props)
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [rating, setRating] = useState(0)
    const [orderDatas, setOrderDatas] = useState([])
    const [currentOrder, setcurrentOrder] = useState(0)
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

    const renderOrderCard=()=>{
        return orderDatas.map((val, index)=>(
            <div className='order-box' key={index}>
                <div className='order-header'>
                    <div style={{fontSize:22, fontWeight:500, color:' #72ceb8'}}>
                        {
                            val.status == 'waitingAdminConfirmation' ? 
                            'Confirming your payment'
                            : val.status == 'paymentCompleted' ?
                            'Payment confirmed'
                            : val.status == 'productOTW' ?
                            'On your way'
                            : 'Delivered'
                        }
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
                        val.status !== 'sentToUser' ?
                        {justifyContent:'flex-end'} : null
                    }>
                        {
                            val.status == 'sentToUser' ?
                            <div className='order-bottom-txt'>
                                <button onClick={()=>onReceivedClick(val.transaction_detail_id)} className='complete-button'>Received</button>
                            </div>
                            : null

                        }
                    
                    <div className='order-content-bottom' >
                        <div className='order-bottom-txt' style={{fontSize:19}}>
                            Total pesanan:
                        </div>
                        <div className='order-bottom-txt ml-2' style={{fontSize:25}}>
                            {priceFormatter(val.quantity*val.price)}
                        </div>
                    </div>
                </div>
            </div>
        ))
    }

    return ( 
        <div>
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
            {renderOrderCard()}
        </div>
     );
}
 
const MapstatetoProps=({Auth})=>{
    return {
      ...Auth, role: Auth.role
    }
}
  
export default connect(MapstatetoProps, {}) (OnGoing);