import React, { useRef, useState, Component, Fragment } from 'react';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {TableFooter} from '@material-ui/core'
import {
    Pagination, 
    PaginationItem, 
    PaginationLink,
    Button, 
    Modal, 
    ModalHeader, 
    ModalBody, 
    ModalFooter, 
    CustomInput
} from 'reactstrap';
import { Add, PlusOneOutlined } from '@material-ui/icons';
import Select from 'react-select';


const data = [
    {username:'BSD001', warehouse:'Gudang BSD'},
    {username:'BKS001', warehouse:'Gudang Bekasi'},
    {username:'PLT001', warehouse:'Gudang Pluit'},
]

const profPict = 'https://i.stack.imgur.com/l60Hf.png'

const options = [
    { value: 'Gudang BSD', label: 'Gudang BSD' },
    { value: 'Gudang Bekasi', label: 'Gudang Bekasi' },
    { value: 'Gudang Pluit', label: 'Gudang Pluit' }
]

const UserManagement = () => {

    const [modal, setModal] = useState(false);
    // const [options, setOptions] = useState('')
    const [addForm, setAddForm] = useState({
        username: useRef(),
        warehouse: useRef()
    })

    const toggle = () => setModal(!modal);

    const MyComponent = () => (
        <Select options={options} />
    )

    const renderUserDetailTableBody=()=>{
        return data.map((val, index)=>(
            <TableRow key={index}>
                <TableCell>{index+1}</TableCell>
                <TableCell >
                    <div className='user_management_table'>
                        <div className='mr-3'>
                            <img className='prof-pict' src={profPict}/>
                        </div>
                        <div>{val.username}</div>
                    </div>
                </TableCell>
                <TableCell>{val.warehouse}</TableCell>
            </TableRow>
        ))
    }
    return ( 
        <div>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Create Admin</ModalHeader>
                <ModalBody>
                    <input type='text' placeholder='Enter username' className='form-control mb-2'/>
                    <div class="input-group mb-3">
                        <div class="input-group-prepend">
                            <label class="input-group-text" for="inputGroupSelect01">Ware House</label>
                        </div>
                        <select class="custom-select" id="inputGroupSelect01">
                            <option selected>Choose...</option>
                            <option value="1">Gudang BSD</option>
                            <option value="2">Gudang Bekasi</option>
                            <option value="3">Gudang </option>
                        </select>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className='btn btn-outline-info mr-3'>Add</button>
                        <button className="btn btn-outline-primary" onClick={toggle}>back</button>
                    </div>
                </ModalFooter>
            </Modal>
            <button className='btn btn-outline-info mb-4' onClick={toggle}>
                Create Admin <Add/>
            </button>
            <div style={{width:'50%'}}>
                <Paper >
                    <TableContainer >
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Username</TableCell>
                                    <TableCell>Ware House</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {renderUserDetailTableBody()}
                            </TableBody>
                            <TableFooter>

                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Paper>
            </div>
        </div>
    );
}
 
export default UserManagement;