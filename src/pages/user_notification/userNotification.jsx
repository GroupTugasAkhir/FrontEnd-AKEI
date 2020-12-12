import React, {useState} from 'react';
import './style.css'
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
  

const UserNotification = () => {
    const [expanded, setExpanded] = useState('panel1');
    const classes = useStyles();

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };


    
    return ( 
        <div>
            <div className={classes.root}>
                <Accordion square={false} expanded={expanded === 'panel1'} style={{marginBottom:10}} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header"  expandIcon={<ExpandMoreIcon />}>
                        <div className='tes-top'>
                            <Typography className={classes.heading}>Delivered</Typography>
                            <Typography className={classes.secondaryHeading}>Transaction ID: 334343434343</Typography>
                        </div>
                        
                    </AccordionSummary>
                    <AccordionDetails >
                        <div >
                            <Timeline align="left">
                                <TimelineItem >
                                    <TimelineSeparator>
                                        <TimelineDot style={{backgroundColor:'#72ceb8'}}/>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent >
                                        <Typography className={classes.heading}>Payment Confirmed</Typography>
                                        <Typography className={classes.secondaryHeading} style={{width:800}}>
                                            Please wait for your <a style={{fontWeight:'bold'}}>334343434343</a> order to arrive
                                        </Typography>
                                        <Typography className={classes.secondaryHeading}>
                                            20 Juli 2020 14:44:45
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                                <TimelineItem >
                                    <TimelineSeparator>
                                        <TimelineDot style={{backgroundColor:'#72ceb8'}}/>
                                        <TimelineConnector />
                                    </TimelineSeparator>
                                    <TimelineContent >
                                        <Typography className={classes.heading}>Payment Confirmed</Typography>
                                        <Typography className={classes.secondaryHeading} style={{width:800}}>
                                            Please wait for your <a style={{fontWeight:'bold'}}>334343434343</a> order to arrive
                                        </Typography>
                                        <Typography className={classes.secondaryHeading}>
                                            20 Juli 2020 14:44:45
                                        </Typography>
                                    </TimelineContent>
                                </TimelineItem>
                            </Timeline>
                        </div>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
}
 
export default UserNotification;