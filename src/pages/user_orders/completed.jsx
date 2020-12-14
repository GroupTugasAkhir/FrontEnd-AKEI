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
import Axios from 'axios'
import withReactContent from 'sweetalert2-react-content'
import { API_URL_SQL, priceFormatter, dateFormatter} from '../../helpers';
import Avatar from '@material-ui/core/Avatar';
import { Link , useHistory} from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 1,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
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


const Completed = (props) => {
    // console.log(props)
    const classes = useStyles();
    const history = useHistory()
    const [value, setValue] = React.useState(0);
    const [modal, setModal] = useState(false);
    const [rating, setRating] = useState(0)
    const [orderDatas, setOrderDatas] = useState([])
    const [currentRating, setcurrentRating] = useState([])
    const [ratingprod, setratingprod] = useState(0)
    const [filter, setFilter] = useState([])
    const [switchRender, setSwitchRender] = useState(false)
    const comment = useRef()

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/orders/getCompleted/${props.user_id}`)
        .then((res)=>{
            setOrderDatas(res.data)
            console.log(res.data)
        }).catch((err)=>console.log(err))
    },[])

    const toggle = () =>{
        setModal(!modal)
    }


    // const changeRating=(newRating, name)=>{
    //     console.log(newRating)
    //     setRating(newRating)
    //     // console.log(rating)
    // }

    const seeRating=(idPr)=>{
        console.log(idPr, props.user_id)
        Axios.get(`${API_URL_SQL}/orders/getRating/${props.user_id}/${idPr}`)
        .then((res)=>{
            setcurrentRating(res.data)
            setratingprod(res.data[0].product_name)
            console.log(res.data)
            toggle()
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
                        <div style={{fontSize:22, fontWeight:500, color:' #72ceb8', textTransform:'capitalize', paddingRight:10}}>
                            {val.status}
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
                <div className='order-content-bottom-box' >
                        <div className='order-content-bottom'>
                            <div className='order-bottom-txt mr-3'>
                                <Link to={"/detailproduct/"+val.product_id}>
                                    <button className='complete-button'>Buy Again</button>
                                </Link>
                            </div>
                            <div className='order-bottom-txt'>
                                <button className='see-rating-button' onClick={()=>seeRating(val.product_id)}>See Product Rating</button>
                            </div>

                        </div>
                    
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

    // console.log(currentRating[0].product_name)

    return ( 
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>{ratingprod} Rating</ModalHeader>
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
                    <button className="cancel-button" onClick={toggle}>Cancel</button>
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
  
export default connect(MapstatetoProps, {}) (Completed);