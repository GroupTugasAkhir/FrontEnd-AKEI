import React from 'react';
import './admin.css'
import Header from './../../component/HeaderAdmin'
import { Table } from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';



const Admin = () => {
   

    return ( 
        <div>
            <Header/>
            <div className='outest-div'>
                <a className='title'>Manage Products</a>
                <div>
                    <a>Main Products</a>
                    <a>Inventory</a>
                </div>
                <div style={{paddingTop:20}}>
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