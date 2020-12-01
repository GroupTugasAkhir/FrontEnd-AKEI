import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import Header from './../../component/Header'

const Cart = (props) => {
    const [activeTab, setActiveTab] = useState('1');

    const toggle = (tab) => {
        if(activeTab !== tab) setActiveTab(tab);
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
                        <h4>Tab Cart Contents</h4>
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