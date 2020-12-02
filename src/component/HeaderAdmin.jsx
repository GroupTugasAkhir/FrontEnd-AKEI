import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';
import {NotificationImportantOutlined, Notifications, NotificationsActiveOutlined} from '@material-ui/icons'
import { Badge } from '@material-ui/core';

const HeaderAdmin = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="light" light expand="md" className='px-5'>
        <NavbarBrand href="/" style={{color:'salmon'}}>AKEI</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavItem>
              <NavLink style={{color:'red'}}>Product</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >User Management</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >Transaction</NavLink>
            </NavItem>
            <NavItem>
              <NavLink >Inventory</NavLink>
            </NavItem> */}
          </Nav>
          <Badge color="secondary" badgeContent={3} showZero>
            <Notifications/>
          </Badge>
          <NavbarText style={{paddingLeft:'2%'}}>username</NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
}

export default HeaderAdmin;