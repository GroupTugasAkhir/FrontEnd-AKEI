import React, { useState, useEffect, useRef} from 'react';
import { connect } from 'react-redux';
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
import Axios from 'axios'
import { API_URL_SQL } from '../../helpers/apiurl';



const BranchInventory = (props) => {
    const [modal, setModal] = useState(false)
    const [allProduct, setAllProduct] = useState([])
    const [currentWHprod, setCurrentWHprod] = useState([]) // all product on current WH
    const [productSold, setProductSold] = useState([]) // all sold product on current WH
    const [addForm, setAddForm] = useState({
        qty: useRef(),
        product_id: useRef()
    })

    useEffect(()=>{
      Axios.get(`${API_URL_SQL}/admin/getCurrentWHProduct/${parseInt(props.notes)}`)
      .then((res)=>{
        // console.log(res.data)
        setAllProduct(res.data.dataMainProd)
        setCurrentWHprod(res.data.dataCurrentWH)
        // setProductSold(res.data.dataSoldCurrentWH)
        // console.log(allProduct)
      }).catch((err)=>{
        console.log(err)
      })
    },[])


    const toggle = () => setModal(!modal);

    const addQtyProduct=()=>{
        var quantity = parseInt(addForm.qty.current.value)
        var product_id = parseInt(addForm.product_id.current.value)
        var location_id = parseInt(props.notes)
        var status = 'add'
        var data = {quantity, product_id, location_id, status}
        console.log(data)
        Axios.post(`${API_URL_SQL}/admin/addWHProduct`, data)
        .then((res)=>{
            alert('sukses add prod')
            setCurrentWHprod(res.data)
            toggle()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const correctQtyProduct=()=>{
        var quantity = parseInt(addForm.qty.current.value)*(-1)
        var product_id = parseInt(addForm.product_id.current.value)
        var location_id = parseInt(props.notes)
        var status = 'correction'
        var data = {quantity, product_id, location_id, status}
        console.log(data)
        Axios.post(`${API_URL_SQL}/admin/addWHProduct`, data)
        .then((res)=>{
            alert('sukses koreksi prod')
            setCurrentWHprod(res.data)
            toggle()
        }).catch((err)=>{
            console.log(err)
        })
    }

    const renderOptions=()=>{
        return allProduct.map((val, index)=>(
            <option key={index} value={val.product_id}>{val.product_name}</option>
        ))
    }

    const renderTableInventory=()=>{
        return currentWHprod.map((val, index)=>(
          <tr key={index}>
            <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
            <td>
                <div style={{maxWidth:'100px'}}>
                    <img width='100%' height='100%'  src={API_URL_SQL + val.image}/>
                </div>
            </td>
            <td>{val.product_name}</td>
            <td>{val.available_stock} pcs</td>
            <td>{val.hold_stock ? val.hold_stock*(-1) : 0} pcs</td>
            <td>{val.available_stock - val.hold_stock} pcs</td>
          </tr>
        ))
    }
    

    console.log(currentWHprod)
    console.log(productSold)
    return ( 
        <div style={{paddingTop:10}}>
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Input Stock</ModalHeader>
                <ModalBody>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <label class="input-group-text" for="inputGroupSelect01">Product</label>
                    </div>
                    <select class="custom-select" id="inputGroupSelect01" ref={addForm.product_id}>
                        <option selected>Choose...</option>
                        {renderOptions()}
                    </select>
                </div>
                <input type='number' placeholder='Enter product quantity...' ref={addForm.qty} className='form-control mb-2'/>
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className='btn btn-outline-info mr-3' onClick={addQtyProduct}>Add</button>
                        <button className='btn btn-outline-info mr-3' onClick={correctQtyProduct}>Correction</button>
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
                        <th>Operational Stock (Total)</th>
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
const MapstatetoProps=({Auth})=>{
    return {
      ...Auth, role: Auth.role
    }
  }
  
  export default connect(MapstatetoProps, {}) (BranchInventory);