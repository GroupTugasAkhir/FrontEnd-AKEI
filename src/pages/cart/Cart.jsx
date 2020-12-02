import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { makeStyles, withStyles } from '@material-ui/core/styles';
// import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Header from './../../component/Header'
import './style.css'

//testing
import testImg from './../../assets/mainregimg.jpg'

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.common.black,
    },
    // body: {
    //   fontSize: 14,
    // },
  }))(TableCell);

const useStyles = makeStyles({
    table: {
      backgroundColor: 'white',
      color: 'white'
    },
  });

const Cart = (props) => {
    const classes = useStyles();
    const [qtyCart, setqtyCart] = useState([0, 2])

    const plusBtn = (ind) => {
        const plusVar = [...qtyCart]
        plusVar[ind] += 1
        setqtyCart(plusVar)
        console.log(plusVar);
    }

    const minBtn = (ind) => {
        const minVar = [...qtyCart]
        minVar[ind] -= 1
        setqtyCart(minVar)
        console.log(minVar);
    }

    const renderCart = () => {
        return qtyCart.map((val, ind)=> {
            return (
                <TableRow>
                    <TableCell style={{width: '100px'}}>
                        <div className='cartimg'>
                            <img style={{objectFit: 'contain', objectPosition: '50% 50%'}} width='100%' height='100%' src={testImg} alt=''/>
                        </div>
                    </TableCell>
                    <TableCell>Kursi</TableCell>
                    <TableCell>$200</TableCell>
                    <TableCell>
                        <div className='d-flex'>
                            <button className='qty-button-minus' onClick={()=>minBtn(ind)}>-</button>
                            <div className='qty-area'>
                                {val}
                            </div>
                            <button className='qty-button-plus' onClick={()=>plusBtn(ind)}>+</button>
                        </div>
                    </TableCell>
                    <TableCell>$1000</TableCell>
                </TableRow>            
            )
        })
    }

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div style={{marginTop: '80px', marginInline: '50px'}} >
                <div className='cartsection'>
                    <div style={{width: '70%'}}>
                        <Paper elevation={0}>
                            <TableContainer>
                                <Table stickyHeader className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <StyledTableCell colSpan='2'>Product</StyledTableCell>
                                            <StyledTableCell>Price</StyledTableCell>
                                            <StyledTableCell>Quantity</StyledTableCell>
                                            <StyledTableCell>Total</StyledTableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {renderCart()}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </div>
                    <div style={{width: '30%'}}>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart