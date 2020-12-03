import React, { useState } from 'react';
import Header from '../../component/Header';
import './style.css'
import { Breadcrumb,
    BreadcrumbItem,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input
 } from 'reactstrap';

const UserProfile=(props)=>{
    const [imgPreview,setImgPreview] = useState(null)

    const changePicture=(e)=>{
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <div>
            <Header style={{backgroundColor:'#72ceb8'}}/>
            <section className="section-profile mt-3" style={{marginBottom:'-86px'}}>
                <div className="container-profile">
                    <Breadcrumb>
                        <BreadcrumbItem active tag="span">Username</BreadcrumbItem>
                        <BreadcrumbItem active tag="span" style={{color:'gray', fontWeight:'bold'}}>Edit Profile</BreadcrumbItem>
                    </Breadcrumb>
                    <Form className='form-edit'>
                        <div className="form-left">
                            <FormGroup className='avatar-box'>
                                <img src={imgPreview} alt=""/>
                                <Input type="file" name="file" onChange={changePicture}/>
                            </FormGroup>
                        </div>
                        <div className="form-right">
                            <FormGroup className='input-box'>
                                <Label>Username</Label>
                                <input style={{width:'70%'}} type="text"/>
                            </FormGroup>
                            <FormGroup className='input-box'>
                                <Label>Email</Label>
                                <input style={{width:'70%'}} type="text"/>
                            </FormGroup>
                            <FormGroup className='input-box'>
                                <Label for="exampleEmail">Old Password</Label>
                                <input style={{width:'70%'}} type="password"/>
                            </FormGroup>
                            <FormGroup className='input-box'>
                                <Label for="exampleEmail">New Password</Label>
                                <input style={{width:'70%'}} type="password"/>
                            </FormGroup>
                            <FormGroup className='input-box'>
                                <Label for="exampleEmail">Confirm New Password</Label>
                                <input style={{width:'70%'}} type="password"/>
                            </FormGroup>
                            <Button>Submit</Button>
                        </div>
                    </Form>
                </div>
            </section> 
        </div>
    )
} 

export default UserProfile