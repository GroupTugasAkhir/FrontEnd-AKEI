import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Header from './../../component/Header'

//testing
import testImg from './../../assets/mainregimg.jpg'

const Cart = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
    }

    const renderCart = () => {
        return (
            <TableRow>
                <TableCell>
                    <div style={{maxWidth:'150px'}}>
                        <img width='100%' height='100%' src={testImg} alt=''/>
                    </div>
                </TableCell>
                <TableCell>Kursi</TableCell>
                <TableCell>$200</TableCell>
                <TableCell>5</TableCell>
                <TableCell>$1000</TableCell>
            </TableRow>
        )
    }

    return (
        <>
            <Header style={{backgroundColor: '#72ceb8'}}/>
            <div style={{marginTop: '80px', marginInline: '50px'}} >
                <Nav tabs>
                    <NavItem >
                        <NavLink
                            className={activeTab === '1' ? 'active' : '' }
                            onClick={() => { toggle('1'); }}
                        >
                            Cart
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={activeTab === '2' ? 'active' : '' }
                            onClick={() => { toggle('2'); }}
                        >
                            History
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={activeTab}>
                    <TabPane tabId="1">
                        <Row>
                            <Col sm="12">
                                <div className='section'>
                                    <div style={{width: '70%'}}>
                                        <Paper >
                                            <TableContainer >
                                                <Table stickyHeader>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell colSpan='2'>Product</TableCell>
                                                            <TableCell>Price</TableCell>
                                                            <TableCell>Quantity</TableCell>
                                                            <TableCell>Total</TableCell>
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
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                            <Col sm="6">
                                <Card body>
                                    <CardTitle>Special Title Treatment</CardTitle>
                                    <CardText>With supporting text below as a natural lead-in to additional content.</CardText>
                                    <Button>Go somewhere</Button>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>
            </div>
        </>
    )
}

export default Cart