import React, { useState } from 'react';
import BranchOrder from './branch_order'
import BranchInventory from './branch_inventory'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
      backgroundColor: 'coral',
    },
})(Tabs);
  
const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
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
        color: 'coral',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: 'coral',
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
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    typography: {
      padding: theme.spacing(1),
    },
}));

const AdminBranch = () => {
    const [showTab, setShowTab] = useState(1)
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return ( 
        <div>
            <div className='title'>Hello BSD001!</div>
            <div className='menu-tabs'>
                <div className={classes.root} >
                    <div className={classes.demo1}>
                        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                            <AntTab label="Order" onClick={()=>setShowTab(1)}/>
                            <AntTab label="Inventory" onClick={()=>setShowTab(2)}/>
                        </AntTabs>
                        <Typography className={classes.padding} />
                    </div>
                </div>
            </div>
            {
                showTab == 1 ?
                <BranchOrder/>
                : <BranchInventory/>
            }
        </div>
    );
}
 
export default AdminBranch;