import React, { useState } from 'react';
import Header from '../../component/header/Header';
import './style.css'
import { Breadcrumb,
    BreadcrumbItem,
    Button, 
    Form, 
    FormGroup, 
    Label, 
    Input
 } from 'reactstrap';
 import {connect} from 'react-redux'
// import { API_URL_SQL } from '../../helpers';

const UserProfile=(props)=>{
    const [imgPreview,setImgPreview] = useState(null)

    const changePicture=(e)=>{
        setImgPreview(URL.createObjectURL(e.target.files[0]))
    }

    const photoUser = () => {
        let strPhoto = props.Auth.photo
        if(strPhoto) {
            if(strPhoto.indexOf('https') > -1) {
                return strPhoto
            } 
            return imgPreview
        }
    }

    return (
        <div>
            <Header style={{backgroundColor:'#72ceb8'}}/>
            <section className="section-profile" style={{marginBottom:'-86px'}}>
                <div className="container-profile">
                    <Breadcrumb>
                        <BreadcrumbItem active tag="span">Username</BreadcrumbItem>
                        <BreadcrumbItem active tag="span" style={{color:'gray', fontWeight:'bold'}}>Edit Profile</BreadcrumbItem>
                    </Breadcrumb>
                    <Form className='form-edit'>
                        <div className="form-left">
                            <FormGroup className='avatar-box'>
                                <img src={photoUser()} alt=""/>
                                <Input type="file" name="file" onChange={changePicture}/>
                            </FormGroup>
                        </div>
                        <div className="form-right">
                            <FormGroup className='input-box'>
                                <Label>Username</Label>
                                <input value={props.Auth.username} style={{width:'70%'}} type="text"/>
                            </FormGroup>
                            <FormGroup className='input-box'>
                                <Label>Email</Label>
                                <input value={props.Auth.email} style={{width:'70%'}} type="text"/>
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
                            <Button className='float-right'>Submit</Button>
                        </div>
                    </Form>
                </div>
            </section> 
        </div>
    )
} 

const Mapstatetoprops = (state) => {
    return {
        Auth: state.Auth
    }
}

export default connect(Mapstatetoprops)(UserProfile)