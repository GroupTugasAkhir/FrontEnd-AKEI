import React, { useState , useEffect} from 'react';
import './style.css'
import Header from '../../component/header/Header'
import OnGoing from './ongoing'
import Completed from './completed'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';

const AntTabs = withStyles({
    root: {
      borderBottom: '0px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#72ceb8',
    },
})(Tabs);
  
const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontSize: 18,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        opacity: 1,
      },
      '&$selected': {
        color: '#72ceb8',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#72ceb8',
      },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(1),
    },
    demo1: {
    //   backgroundColor: theme.palette.background.paper,
      backgroundColor: '#F7F3F2',
      paddingTop: 10,
      paddingLeft: 40,
      borderRadius:30
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    typography: {
      padding: theme.spacing(1),
    },
}));

const UserOrders = () => {
    const [showTab, setShowTab] = useState(1)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return ( 
        <div>
            <Header/>
            <div style={{marginTop: '120px', marginInline: '50px',marginLeft:'12vw',marginRight:'12vw'}}>
                <div className='orders-tabs'>
                    <div className={classes.root} >
                    <div className={classes.demo1}>
                        <AntTabs value={value} onChange={handleChange} aria-label="ant example" >
                            <AntTab label="On Going" onClick={()=>setShowTab(1)}/>
                            <AntTab label="Completed" onClick={()=>setShowTab(2)}/>
                        </AntTabs>
                        <Typography className={classes.padding} />
                    </div>
                    </div>
                </div>
                <div className='tabs-content'>
                {
                    showTab == 1 ?
                    <OnGoing/>
                    : showTab == 2 ?
                    <Completed/>
                    : 'asasas'
                }
                </div>
            </div>
        </div>
    );
}
 
export default UserOrders;