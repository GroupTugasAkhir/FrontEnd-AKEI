import React, { useState } from 'react';
import './admin.css'
import { Table, 
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter
} from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Add, Settings } from '@material-ui/icons';

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

const BranchInventory = () => {
    const [modal, setModal] = useState(false)

    const toggle = () => setModal(!modal);

    const renderTableInventory=()=>{
        return data.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>
                <div style={{maxWidth:'100px'}}>
                    <img width='100%' height='100%'  src={val.image}/>
                </div>
            </td>
            <td>{val.name}</td>
            <td> {index %2 == 0 ? '10 pcs' : '15 pcs'}</td>
            <td>{index %2 == 0 ? '0 pcs' : '3 pcs'}</td>
            <td>{index %2 == 0 ? '10 pcs' : '18 pcs'}</td>
          </tr>
        ))
    }


    return ( 
        <div style={{paddingTop:10}}>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Input Stock</ModalHeader>
                <ModalBody>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Product</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01">
                        <option selected>Choose...</option>
                        <option value="1">Chair</option>
                        <option value="2">Table</option>
                        <option value="3">Sofa</option>
                    </select>
                </div>
                <input type='number' placeholder='Enter product quantity...' className='form-control mb-2'/>
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className='btn btn-outline-info mr-3'>Add</button>
                        <button className="btn btn-outline-primary" onClick={toggle}>back</button>
                    </div>
                </ModalFooter>
            </Modal>
            <button className='btn btn-outline-info mb-4' onClick={toggle}>
                Input Stock <Add/>
            </button>
            <Table>
                <thead>
                    <tr>
                        <th></th>
                        <th>Image</th>
                        <th>Product</th>
                        <th>Avalaible Stock</th>
                        <th>On Packaging</th>
                        <th style={{width:300}}>Total</th>
                    </tr>
                </thead>
                <tbody>
                {renderTableInventory()}
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
            </div>
        </div>
    );
}
 
export default BranchInventory;