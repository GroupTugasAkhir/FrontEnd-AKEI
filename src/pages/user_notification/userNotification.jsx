import React, {useState, useEffect} from 'react';
import './style.css'
import { connect } from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import StarRatings from 'react-star-ratings';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Axios from 'axios'
import { API_URL_SQL, priceFormatter, dateFormatter } from '../../helpers';
import { Chrono } from "react-chrono";
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { NotificationImportant } from '@material-ui/icons';
import CircularProgress from '@material-ui/core/CircularProgress';

const Accordion = withStyles({
    root: {
      border: '0px solid rgba(0, 0, 0, .125)',
      boxShadow: 'none',
      '&:not(:last-child)': {
        borderBottom: 0,
      },
      '&:before': {
        display: 'none',
      },
      '&$expanded': {
        margin: 'auto',
      },
      '&$rounded': {
        borderRadius: 30,
      },
    },
    expanded: {},
  })(MuiAccordion);
  
const AccordionSummary = withStyles({
    root: {
        backgroundColor: '#F7F3F2',
        // backgroundColor: 'lightgray',
        borderRadius:10,
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
            borderTopLeftRadius:10,
            borderTopRightRadius:10,
            borderBottomLeftRadius:0,
            borderBottomRightRadius:0,
        },
    },
    children :{
        display:'flex',
        flexDirection:'row',
    },
    content: {
        display:'flex',
        flexDirection:'row',
      '&$expanded': {
        margin: '12px 0',
      },
    },
    expanded: {},
})(MuiAccordionSummary);
  
const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        backgroundColor: '#F7F3F2',
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
    },
}))(MuiAccordionDetails);

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
    //   fontSize: theme.typography.pxToRem(15),
    //   flexBasis: '80%',
    //   flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  

const UserNotification = (props) => {
    const [expanded, setExpanded] = useState(false);
    const [dataNotif, setdataNotif] = useState([])
    const [timeline, setTimeLine] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const classes = useStyles();

    useEffect(()=>{
        Axios.get(`${API_URL_SQL}/orders/getAllNotif/${props.user_id}`)
        .then((res)=>{
            console.log(res.data)
            setdataNotif(res.data)
            console.log('date in luar'+ res.data[0].date_in)
            console.log(dateFormatter(parseInt( res.data[0].date_in)))
        }).catch((err)=>console.log(err))
    },[])

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        
    };

    const onAccordionClick=(idTrans)=>{
        console.log(idTrans)
        Axios.get(`${API_URL_SQL}/orders/getProgress/${idTrans}`)
        .then((res)=>{
            console.log(res.data)
            console.log(res.data[0].date_in)
            setTimeLine(res.data)
            // setisLoading(!isLoading)
        }).catch((err)=>console.log(err))
    }

    const renderAccordion=()=>{
        return dataNotif.map((val, index)=>(
            <Accordion key={index} square={false} expanded={expanded === `panel${index+1}`} style={{marginBottom:10}} onChange={handleChange(`panel${index+1}`)}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />} onClick={()=>onAccordionClick(val.transaction_id)}>
                    <div className='tes-top'>
                        <Typography className={classes.heading}>
                            {
                                val.status == 'waitingAdminConfirmation' ? 
                                'Confirming your payment'
                                : val.status == 'paymentCompleted' ?
                                'Payment confirmed'
                                : val.status_log == 'completed' ?
                                'Completed'
                                : val.status == 'productOTW' ?
                                'On your way'
                                : val.status == 'sentToUser' ?
                                'Delivered'
                                : 'Completed'
                            }
                        </Typography>
                        <Typography className={classes.secondaryHeading}>Transaction ID: {val.trans_code}</Typography>
                        <Typography style={{fontSize:12}} className={classes.secondaryHeading}>{dateFormatter(parseInt(val.date_in))}</Typography>
                    </div>
                </AccordionSummary>
                <AccordionDetails >
                    <div >
                        {
                            // isLoading ?  
                            // <div style={{display:'flex'}}>
                            //     <CircularProgress style={{color:'#72ceb8'}}/>
                            // </div>
                            // :
                            timeline.map((val, index)=>(
                                <Timeline align="left" key={index}>
                                    <TimelineItem >
                                        <TimelineSeparator>
                                            <TimelineDot style={{backgroundColor:'#72ceb8'}}/>
                                            <TimelineConnector />
                                        </TimelineSeparator>
                                        <TimelineContent >
                                            <Typography className={classes.heading}>
                                                {
                                                    val.status_log == 'waitingAdminConfirmation' ? 
                                                    'Confirming your payment'
                                                    : val.status_log == 'paymentCompleted' ?
                                                    'Payment confirmed'
                                                    : val.status_log == 'completed' ?
                                                    'Completed'
                                                    : val.status_log == 'productOTW' ?
                                                    'On your way'
                                                    : val.status_log == 'sentToUser' ?
                                                    'Delivered'
                                                    : 'Completed'
                                                }
                                            </Typography>
                                            <Typography className={classes.secondaryHeading} style={{width:800}}>
                                            {
                                                    val.status_log == 'waitingAdminConfirmation' ? 
                                                    'Confirming your payment'
                                                    : val.status_log == 'paymentCompleted' ?
                                                    'Your payment has been accepted. We are packaging your product, please wait patienly'
                                                    : val.status_log == 'Completed' ?
                                                    'Thank you for buying our furniture'
                                                    : val.status_log == 'productOTW' ?
                                                    'Our product is on your way'
                                                    : val.status_log == 'sentToUser' ?
                                                    'Your order has arrived! Please complete the transaction in On Going Tab'
                                                    : 'Thank you for buying our furniture, have a great day!'
                                                }
                                                
                                            </Typography>
                                            <Typography className={classes.secondaryHeading}>
                                                {dateFormatter(parseInt(val.date_in))}
                                            </Typography>
                                        </TimelineContent>
                                    </TimelineItem>
                                </Timeline>
                            ))
                        }
                        
                    </div>
                </AccordionDetails>
            </Accordion>
        ))
    }

    
    return ( 
        <div>
            {renderAccordion()}
        </div>
    );
}

const MapstatetoProps=({Auth})=>{
    return {
      ...Auth, role: Auth.role
    }
}
  
export default connect(MapstatetoProps, {}) (UserNotification)