import React from 'react';
import './admin.css'
import Header from './../../component/HeaderAdmin'
import { Table } from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';

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
}));

const Admin = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    return ( 
        <div>
            <Header/>
            <div className='outest-div'>
                <a className='title'>Manage Products</a>
                <div className='menu-tabs'>
                    <div className={classes.root} >
                        <div className={classes.demo1}>
                            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                            <AntTab label="Main Products" />
                            <AntTab label="Inventory" />
                            </AntTabs>
                            <Typography className={classes.padding} />
                        </div>
                    </div>
                </div>
                <div style={{paddingTop:10}}>
                    <Table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Category</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>Chair</td>
                                <td>img</td>
                                <td>1.000.000</td>
                                <td>Category</td>
                                <td>White elegant chair super comfy</td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>Sofa</td>
                                <td>img</td>
                                <td>1.000.000</td>
                                <td>Category</td>
                                <td>White elegant chair super comfy</td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>Long Table</td>
                                <td>img</td>
                                <td>1.000.000</td>
                                <td>Category</td>
                                <td>White elegant chair super comfy</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                
            </div>
        </div>
     );
}
 
export default Admin;