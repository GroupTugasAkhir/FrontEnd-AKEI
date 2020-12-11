import React, { useState , useEffect} from 'react';
import './style.css'
import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import StarRatings from 'react-star-ratings';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const uriPic = {
chair: 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
table: 'https://images.unsplash.com/photo-1602009445825-70e98455ea7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
}

const OnGoing = () => {
    const classes = useStyles();
    const [modal, setModal] = useState(false);
    const [rating, setRating] = useState(0)

    const toggle = () => setModal(!modal);

    const changeRating=(newRating, name)=>{
        console.log(newRating)
        setRating(newRating)
        // console.log(rating)
    }

    return ( 
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Rate our product</ModalHeader>
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
                        <textarea className='form-control mt-2' cols='30' rows='7' placeholder='Write your comment'></textarea>

                    </div>
                </ModalBody>
                <ModalFooter>
                    <button className="complete-button" >Complete</button>{' '}
                    <button className="cancel-button" onClick={toggle}>Cancel</button>
                </ModalFooter>
            </Modal>
            <div className='order-box'>
                <div className='order-header'>
                    <div style={{fontSize:22, fontWeight:500, color:' #72ceb8'}}>
                        Delivered
                    </div>

                </div>
                <div className='order-content'>
                    <div className='order-top'>
                        <div>
                            <img width={80} height={80} style={{borderRadius:10}} src={uriPic.chair} alt="AKEI"/>
                        </div>
                        <div className='order-detail pl-3'>
                            <div className='order-name' style={{fontSize:18}}>
                                Chairrr
                            </div>
                            <div className='order-name'>
                                x 5
                            </div>
                        </div>
                    </div>
                    <div className='order-price' style={{fontSize:18}}>
                        100000
                    </div>
                </div>
                <div className='order-content-bottom-box'>
                    <div className='order-bottom-txt'>
                        <button onClick={toggle} className='complete-button'>complete</button>
                    </div>
                    <div className='order-content-bottom'>
                        <div className='order-bottom-txt' style={{fontSize:19}}>
                            Total pesanan:
                        </div>
                        <div className='order-bottom-txt ml-2' style={{fontSize:25}}>
                            Rp 500.000
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default OnGoing;