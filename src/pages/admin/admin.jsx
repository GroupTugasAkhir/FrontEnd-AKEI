import React, { useState } from 'react';
import './admin.css'
import Header from './../../component/HeaderAdmin'
import InventoryLog from './inventoryLog'
import TransactionLog from './transactionLog'
import UserManagement from './userManagement'
import { Table, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Settings } from '@material-ui/icons';

const uriPic = {
  chair: 'https://images.unsplash.com/photo-1561677978-583a8c7a4b43?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1050&q=80',
  sofa: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80',
  table: 'https://images.unsplash.com/photo-1602009445825-70e98455ea7c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
}

const data = [
  {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
]

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

const Admin = () => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [page, setPages] = useState(1)
    const [showProd, setShowProd] = useState(1)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    

    const renderMainProducts=()=>(
      <div style={{paddingTop:10}}>
        <Table>
            <thead>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stock</th>
                    <th>Category</th>
                    <th style={{width:300}}>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {renderTableMainProducts()}
            </tbody>
        </Table>
        <div className='table_footer'>
          <Pagination aria-label="Page navigation example">
            <PaginationItem>
                <PaginationLink first href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink previous href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">
                  3
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink next href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink last href="#" />
              </PaginationItem>
          </Pagination>
          <div>
            <button className='btn btn-outline-info'>Add Data</button>
          </div>
        </div>
      </div>
    )

    const renderTableMainProducts=()=>{
      return data.map((val, index)=>(
        <tr key={index}>
          <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
          <td style={{width:200}}>
            <div style={{maxWidth:'200px'}}>
              <img width='50%' height='25%'  src={val.image}/>
            </div>
          </td>
          <td>{val.name}</td>
          <td>{val.price}</td>
          <td className='modal_stock'>
            <div onClick={handleClick}>30 pcs</div>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'center',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
            >
              <Typography className={classes.typography}>
                Gudang Bekasi: 20 pcs
              </Typography>
              <Typography className={classes.typography}>
                Gudang Pluit: 5 pcs
              </Typography>
              <Typography className={classes.typography}>
                Gudang BSD: 5 pcs
              </Typography>
            </Popover>
          </td>
          <td>{val.category}</td>
          <td>{val.description}</td>
          <td><Settings/></td>
        </tr>
      ))
    }


    return ( 
        <div>
            <Header/>
            <div className='outest-div'>
                <div className='title'>Hello Super Admin!</div>
                <div className='menu-tabs'>
                    <div className={classes.root} >
                        <div className={classes.demo1}>
                            <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                <AntTab label="Main Products" onClick={()=>setShowProd(1)}/>
                                <AntTab label="Inventory Log" onClick={()=>setShowProd(2)}/>
                                <AntTab label="Transaction Log" onClick={()=>setShowProd(3)}/>
                                <AntTab label="User Management" onClick={()=>setShowProd(4)}/>
                            </AntTabs>
                            <Typography className={classes.padding} />
                        </div>
                    </div>
                </div>
                {
                  showProd == 1 ? 
                  renderMainProducts() 
                  : showProd == 2 ?
                  <InventoryLog/>
                  : showProd == 3 ?
                  <TransactionLog/>
                  : <UserManagement/>
                }
            </div>
        </div>
     );
}
 
export default Admin;