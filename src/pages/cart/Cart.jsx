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
import Header from './../../component/header/Header'
import './style.css'
import {priceFormatter} from './../../helpers/priceFormatter'

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
    const [qtyCart, setqtyCart] = useState([
        {
            id: 1,
            prod: 'Kursi',
            qty: 0,
            price: 1000
        },
        {
            id: 2,
            prod: 'Meja',
            qty: 2,
            price: 3000
        }
    ])

    const plusBtn = (ind) => {
        const plusVar = [...qtyCart]
        plusVar[ind].qty += 1
        setqtyCart(plusVar)
        console.log(plusVar);
    }

    const minBtn = (ind) => {
        const minVar = [...qtyCart]
        minVar[ind].qty -= 1
        setqtyCart(minVar)
        console.log(minVar);
    }

    const renderTotalPrice = () => {
        var total = qtyCart.reduce((total, num)=> {
            return total + (num.price * num.qty)
        }, 0)
        return total
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
                    <TableCell>
                        <div className='cart-words-prod'>
                            {val.prod}
                        </div> 
                    </TableCell>
                    <TableCell>
                        <div className='cart-words'>
                            {priceFormatter(val.price)}
                        </div>
                        </TableCell>
                    <TableCell>
                        <div className='d-flex'>
                            <button className='qty-button-minus' onClick={()=>minBtn(ind)}>-</button>
                            <div className='qty-area'>
                                {val.qty}
                            </div>
                            <button className='qty-button-plus' onClick={()=>plusBtn(ind)}>+</button>
                        </div>
                    </TableCell>
                    <TableCell>
                        <div className='cart-words'>
                            {priceFormatter(val.price*val.qty)}
                        </div>
                    </TableCell>
                </TableRow>            
            )
        })
    }

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div style={{marginTop: '80px', marginInline: '50px'}} >
                <div className='cartsection'>
                    <div className='cart-left-side'>
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
                    <div className='cart-right-side'>
                        <div className='cart-right-side-section'>
                            <div className='right-top-side'>
                                <div style={{padding: '10px'}}>
                                    <h4>Order Summary</h4>
                                    <p style={{color: 'gray'}}>lorem ipsum</p>
                                </div>
                            </div>
                            <div className='right-bottom-side'>
                                <div className='checkout-side'>
                                    <div>
                                        <div style={{color: 'gray'}}>Total Price</div>
                                        <div>{priceFormatter(renderTotalPrice())}</div>
                                    </div>
                                    <button className='checkout-button'>Checkout</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart