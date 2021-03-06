import React, { useRef, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import './admin.css'
// import Header from './../../component/HeaderAdmin'
import Header from './../../component/header/Header'
import { API_URL_SQL, priceFormatter } from '../../helpers';
import AdminBranch from './branch_admin'
import InventoryLog from './inventoryLog'
import TransactionLog from './transactionLog'
import UserManagement from './userManagement'
import { Table, 
  Pagination, 
  PaginationItem, 
  PaginationLink,
  Modal, 
  ModalHeader, 
  ModalBody, 
  ModalFooter, 
  CustomInput
} from 'reactstrap';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import { Settings } from '@material-ui/icons';
import {BsChevronDoubleDown} from 'react-icons/bs'
import {FaChevronCircleDown} from 'react-icons/fa'
import {RiEdit2Fill} from 'react-icons/ri'
import {MdDeleteForever} from 'react-icons/md'
import {GiConfirmed, GiCancel} from 'react-icons/gi'
import Axios from 'axios'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Select from 'react-select'
import BarChart from './admin_dashboard'


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

const dataGudang = [
  {image:uriPic.chair, name:'Gedung Bekasi', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.sofa, name:'Gedung BSD', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  {image:uriPic.table, name:'Gedung Pluit', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.sofa, name:'sofa', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.table, name:'table', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
  // {image:uriPic.chair, name:'chair', price:'1.000.000', category:'category', description:'White elegant chair super comfy'},
]

const AntTabs = withStyles({
    root: {
      borderBottom: '0px solid #e8e8e8',
    },
    indicator: {
      backgroundColor: '#72ceb8',
    },
})(Tabs);
  
const AntTab = withStyles((theme) => ({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        opacity: 1,
      },
      '&$selected': {
        color: '#72ceb8',
        fontWeight: theme.typography.fontWeightMedium,
      },
      '&:focus': {
        color: '#72ceb8',
        outline : 'none'
      },
    },
    selected: {},
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    padding: {
      padding: theme.spacing(1),
    },
    demo1: {
      backgroundColor: theme.palette.background.paper,
    },
    demo2: {
      backgroundColor: '#2e1534',
    },
    typography: {
      padding: theme.spacing(1),
    },
}));

const Admin = (props) => {
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [page, setPages] = useState(1)
    const [allProduct, setAllProduct] = useState([])
    const [prodById, setProdById] = useState({})
    const [refProdCat, setRefProdCat] = useState([]) //by id
    const [allCategory, setAllCategory] = useState([])
    const [allRefProdCat, setAllRefProdCat] = useState([])
    const [stockProdByWH, setStockProdByWH] = useState([]) //stock tiap produk semua WH
    const [showProd, setShowProd] = useState(1)
    const [modal, setModal] = useState(false)
    const [modalAdd, setModalAdd] = useState(false)
    const [modalEdit, setModalEdit] = useState(false)
    const [modalCat, setModalCat] = useState(false)
    const [banner, setBanner] = useState(null)
    const [valueCategory, setValueCategory] = useState(null)
    // const [editCatState, setEditCatState] = useState(false)
    const [idProd, setIdProd] = useState(0)
    const [editId, setEditId] = useState(0)

    const [addForm, setAddForm] = useState({
      // for add product data
      product_name: useRef(),
      price: useRef(),
      image: useRef(),
      description: useRef(),
      ref_category: useRef(),

      // for add category data
      category_name: useRef()
    })

    const [editForm, setEditForm] = useState({
      // for edit product data
      product_name: useRef(),
      price: useRef(),
      image: useRef(),
      description: useRef(),

      // for edit category data
      category_name: useRef()
    })

    useEffect(()=>{
      Axios.post(`${API_URL_SQL}/notification/createRequest`)
      .then(()=>{
        console.log('success update data')
        Axios.get(`${API_URL_SQL}/admin/getProduct`)
        .then((res)=>{
          console.log(res.data)
          setAllProduct(res.data.dataproduct)
          setAllCategory(res.data.datacategory)
          setAllRefProdCat(res.data.datarefcategory)
          console.log(allProduct)
          console.log(allCategory)
        }).catch((err)=>{
          console.log(err)
        })
      }).catch((err)=>console.log(err))
    },[])

    const toggle = () => setModal(!modal);
    const toggleAdd = () => setModalAdd(!modalAdd)
    const toggleEdit = () => setModalEdit(!modalEdit)
    const toggleCat = () => setModalCat(!modalCat)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const MySwal = withReactContent(Swal)

    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })
    
    // console.log(allRefProdCat)
    // console.log(allCategory)

    const renderMainProdCat=(id)=>{
      var num = 1
      var counter = 0
      return allRefProdCat.map((val, index)=>{
        if(counter >= num && val.product_id == id){
          // console.log(counter)
          return ', ' + val.category_name
        }
        else if(val.product_id == id){
          counter++
          num = counter
          // console.log('masuk')
          return val.category_name
        }

      })
    }

    const onInputFileChange=(e)=>{
      console.log(e.target.files)
      if (e.target.files[0]){
          console.log(e.target.files[0])
          setBanner(e.target.files[0])
      }else{
          console.log('hapus')
          setBanner(null)
      }
    }

    const onAddDataClick=()=>{
      var formData = new FormData()
      var options = {
          headers: {
            'Content-type': 'multipart/form-data'
          }
      }
      var product_name = addForm.product_name.current.value
      var price = addForm.price.current.value
      var description = addForm.description.current.value
      var categoryRefCart = valueCategory
      var data = {product_name, price, description, categoryRefCart}
      formData.append('image', banner)
      formData.append('data', JSON.stringify(data))
      console.log(data)
      Axios.post(`${API_URL_SQL}/admin/addProduct`, formData, options)
      .then((res)=>{
        console.log(res.data)
        setAllProduct(res.data.dataProduct)
        setAllRefProdCat(res.data.datarefcategory)
        toggleAdd()
        alert('berhasil')
      }).catch((err)=>{
          console.log(err)
      })
    }

    const onSaveEditClick=()=>{
      var formData = new FormData()
      var options = {
          headers: {
            'Content-type': 'multipart/form-data'
          }
      }
      var product_name = editForm.product_name.current.value
      var price = editForm.price.current.value
      var description = editForm.description.current.value
      var newcategory = valueCategory
      var product_id = prodById.product_id
      var oldimage = prodById.image
      var oldcategory = refProdCat
      var data = {product_name, price, description, newcategory, product_id, oldcategory, oldimage}
      formData.append('image', banner)
      formData.append('data', JSON.stringify(data))
      console.log(newcategory)
      console.log(data)
      if(data){
        Axios.put(`${API_URL_SQL}/admin/editProduct/${product_id}`, formData, options)
        .then((res)=>{
          console.log(res.data)
          setAllProduct(res.data.dataProduct)
          setAllRefProdCat(res.data.datarefcategory)
          toggleEdit()
          alert('berhasil')
        }).catch((err)=>{
            console.log(err)
        })
      }else{
        alert('Empty Form!')
      }
    }

    const onAddCatClick=()=>{
      var category_name = addForm.category_name.current.value
      Axios.post(`${API_URL_SQL}/admin/addCategory/`,{category_name})
      .then((res)=>{
        setAllCategory(res.data)
        console.log(res.data)
        console.log('sukses add category')
        setAddForm('')
      }).catch((err)=>{
        console.log(err)
      })
    }

    const onSaveEditCatClick=(id)=>{
      var category_name = editForm.category_name.current.value
      console.log(category_name)
      Axios.put(`${API_URL_SQL}/admin/editCategory/${id}`,{category_name})
      .then((res)=>{
        setAllCategory(res.data)
        console.log(res.data)
        setEditId(0)
        console.log('sukses')
      }).catch((err)=>{
        console.log(err)
      })
    }

    const onDeleteCatClick=(id)=>{
      console.log(id)
      MySwal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            Axios.delete(`${API_URL_SQL}/admin/deleteCategory/${id}`)
            .then((res)=>{
              setAllCategory(res.data)
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Data has been deleted.',
                'success'
              )
            }).catch((err)=>{
              console.log(err)
            })
        } else if (
            /* Read more about handling dismissals below */
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
              'Cancelled',
              'Your data is safe!'
            )
        }
      })
      
    }

    const renderOptionsCategory=()=>{
      // console.log(allCategory[0].category_id)
      return allCategory.map((val, index)=>(
        { value: val.category_id, label: val.category_name }
      ))
    }


    const onSelectCategoryChange=(e)=>{
      setValueCategory(e)
      console.log(e)
    }

    const onSettingsClick=(prod_id)=>{
      Axios.get(`${API_URL_SQL}/admin/getProductStock/${prod_id}`) // get total stock all WH
      .then((res)=>{
        console.log(res.data)
        setProdById(res.data.dataproduct)
        setRefProdCat(res.data.dataRefCategory)
        toggleEdit()
        // setIdProd(prod_id)
      }).catch((err)=>console.log(err))
    }

    const onArrowDownClick=(prod_id)=>{
      Axios.get(`${API_URL_SQL}/admin/getStock/${prod_id}`) // get total stock current WH
      .then((res)=>{
        // console.log(res.data)
        setStockProdByWH(res.data)
        toggle()
      }).catch((err)=>console.log(err))
    }

    const renderMainProducts=()=>(
      <div style={{paddingTop:10}}>
        <div className='main_prod_div_button'>
          <div>
            <button className='btn btn-outline-info mb-3 mr-3' onClick={toggleAdd}>Add Data</button>
          </div>
          <div>
            <button className='btn btn-outline-info mb-3' onClick={toggleCat}>Category</button>
          </div>
        </div>
        <Table hover>
            <thead>
                <tr>
                    <th></th>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Total Stock</th>
                    <th>Category</th>
                    <th style={{width:300}}>Description</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {
                allProduct.map((val, index)=>(
                  <tr key={index} >
                    <th style={{display:'flex', justifyContent:'center', alignItems:'center'}}>{index+1}</th>
                    <td style={{width:200}}>
                      <div style={{maxWidth:'200px'}}>
                        <img width='50%' height='25%'  src={API_URL_SQL + val.image}/>
                      </div>
                    </td>
                    <td>{val.product_name}</td>
                    <td>{priceFormatter(val.price)}</td>
                    <td> {val.stock} pcs</td>
                    <td>{renderMainProdCat(val.product_id)}</td>
                    <td>{val.description}</td>
                    <td>
                      <Settings className='mr-4 to-hover' onClick={()=>onSettingsClick(val.product_id)}/>
                      <FaChevronCircleDown className='to-hover' onClick={()=>onArrowDownClick(val.product_id)}/>
                    </td>
                  </tr>
                ))
              }
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
    )

    const renderModalStockBody=()=>(
      <Table hover>
        <thead>
          <tr>
              <th>Ware House</th>
              <th>Avalaible Stock</th>
              <th>On Packaging</th>
              <th>Operational Stock (Total)</th>
          </tr>
        </thead>
        <tbody>
          {
            stockProdByWH.map((val, index)=>(
              <tr key={index} >
                <td>{val.location_name}</td>
                <td>{val.available_stock ? val.available_stock : 0} pcs</td>
                <td> {val.hold_stock ? val.hold_stock*(-1) : 0} pcs</td>
                <td>
                  {
                    val.hold_stock && val.available_stock ?
                    val.available_stock - val.hold_stock : 0
                  } pcs
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    )

    const renderModalCategoryTbody=()=>{
      return allCategory.map((val, index)=>(
        <tr key={index}>
          <td>
            { editId == val.category_id ?
              <input type='text' ref={editForm.category_name} defaultValue={val.category_name} className='form-control mb-2'/>
              :
              val.category_name 
            }
          </td>
          <td>
            {
              editId == val.category_id ?
              <>
                <GiConfirmed onClick={()=>onSaveEditCatClick(val.category_id)} className='mr-3 to-hover' style={{fontSize:20, color:'green'}}/> 
                <GiCancel onClick={()=>setEditId(0)}  className='to-hover' style={{fontSize:20, color:'red'}}/>
              </>
              : 
              <>
                <RiEdit2Fill onClick={()=>setEditId(val.category_id)} className='mr-3 to-hover' style={{fontSize:20, color:'#72ceb8'}}/> 
                <MdDeleteForever onClick={()=>onDeleteCatClick(val.category_id)} className='to-hover' style={{fontSize:20, color:'red'}}/>
              </>
            }
          </td>
        </tr>
      ))
    }
    console.log(allCategory)
    console.log(allRefProdCat)

    const renderDefaulValueCat=()=>{
      var arr = allCategory.map((val, index)=>{
        if (val.product_id == idProd){
          return(
            { value: val.category_id, label: val.category_name }
          )
        }
      })
      return arr
    }

    return ( 
        <div>
            <Header/>
            {/* Modal untuk lihat stock semua gudang */}
            <Modal isOpen={modal} toggle={toggle} >
                <ModalHeader toggle={toggle}>Stock</ModalHeader>
                <ModalBody>
                  {renderModalStockBody()}
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        {/* <button className='btn btn-outline-info mr-3'>Proceed</button> */}
                        <button className="btn btn-outline-primary" onClick={toggle}>OK</button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* Modal untuk add data */}
            <Modal isOpen={modalAdd} toggle={toggleAdd}>
                <ModalHeader toggle={toggleAdd}>Input Products</ModalHeader>
                <ModalBody>
                  <label style={{fontSize:15, marginBottom:-5}}>Product name</label>
                  <input type='text' ref={addForm.product_name} placeholder='...' className='form-control mb-2'/>
                  <label style={{fontSize:15, marginBottom:-5}}>Price</label>
                  <input type='number' ref={addForm.price} placeholder='...' className='form-control mb-2'/>
                  <label style={{fontSize:15, marginBottom:-5}}>Image</label>
                  <input type='file' onChange={onInputFileChange} className='form-control mb-2'/>
                  <label style={{fontSize:15, marginBottom:-5}}>Category</label>
                  <Select
                    // defaultValue={[colourOptions[2], colourOptions[3]]}
                    isMulti
                    name="categories"
                    options={renderOptionsCategory()}
                    placeholder='You can choose more than 1'
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onSelectCategoryChange}
                    className='mb-2'
                  />
                  <label style={{fontSize:15, marginBottom:-5}}>Description</label>
                  <textarea ref={addForm.description} className='form-control mb-2' cols='30' rows='7' placeholder='...'></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className='btn btn-outline-info mr-3' onClick={onAddDataClick}>Add Data</button>
                        <button className="btn btn-outline-secondary" onClick={toggleAdd}>Cancel</button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* Modal untuk edit data */}
            <Modal isOpen={modalEdit} toggle={toggleEdit}>
                <ModalHeader toggle={toggleEdit}>Edit Products</ModalHeader>
                <ModalBody>
                  <label style={{fontSize:15, marginBottom:-5}}>Product name</label>
                  <input type='text' ref={editForm.product_name} defaultValue={prodById.product_name} placeholder='...' className='form-control mb-2'/>

                  <label style={{fontSize:15, marginBottom:-5}}>Price</label>
                  <input type='number' ref={editForm.price} defaultValue={prodById.price} placeholder='...' className='form-control mb-2'/>

                  <label style={{fontSize:15, marginBottom:-5}}>Image</label>
                  <input type='file' onChange={onInputFileChange} className='form-control mb-2'/>

                  <label style={{fontSize:15, marginBottom:-5}}>Category</label>
                  <Select
                    defaultValue={
                      refProdCat.map((val, index)=>(
                        { value: val.category_id, label: val.category_name }
                      ))
                    }
                    isMulti
                    name="categories"
                    options={renderOptionsCategory()}
                    placeholder='You can choose more than 1'
                    className="basic-multi-select"
                    classNamePrefix="select"
                    onChange={onSelectCategoryChange}
                    className='mb-2'
                  />

                  <label style={{fontSize:15, marginBottom:-5}}>Description</label>
                  <textarea ref={editForm.description} defaultValue={prodById.description} className='form-control mb-2' cols='30' rows='7' placeholder='...'></textarea>
                </ModalBody>
                <ModalFooter>
                    <div className='modal_footer_tracking'>
                        <button className='btn btn-outline-info mr-3' onClick={onSaveEditClick}>Save</button>
                        <button className="btn btn-outline-secondary" onClick={toggleEdit}>Cancel</button>
                    </div>
                </ModalFooter>
            </Modal>

            {/* Modal untuk category */}
            <Modal isOpen={modalCat} toggle={toggleCat} style={{width:380}}>
                <ModalHeader toggle={toggleCat}>Category List</ModalHeader>
                <ModalBody className='rata-tengah'>
                  <div className='modal_body_cat_div'>
                    <Table hover>
                      <thead>
                        <tr>
                          <th style={{width:170}}>Category</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {renderModalCategoryTbody()}
                        <th>
                          <input type='text' ref={addForm.category_name} placeholder='category...' className='form-control'/>
                        </th>
                        <th>
                          <button className='btn btn-outline-info mr-3' onClick={onAddCatClick}>Add</button>
                        </th>
                      </tbody>
                    </Table>
                  </div>
                </ModalBody>
            </Modal>
            <div className='outest-div'>
              {
                props.role_id == 2 ?
                <>
                  <div className='title'>Hello {props.username}!</div>
                  <div className='menu-tabs'>
                      <div className={classes.root} >
                          <div className={classes.demo1}>
                              <AntTabs value={value} onChange={handleChange} aria-label="ant example">
                                  <AntTab label="Main Products" onClick={()=>setShowProd(1)}/>
                                  <AntTab label="Inventory Log" onClick={()=>setShowProd(2)}/>
                                  <AntTab label="Transaction Log" onClick={()=>setShowProd(3)}/>
                                  <AntTab label="User Management" onClick={()=>setShowProd(4)}/>
                                  <AntTab label="Dashboard" onClick={()=>setShowProd(5)}/>
                              </AntTabs>
                              <Typography className={classes.padding} />
                          </div>
                      </div>
                  </div>
                  {
                    showProd == 1 ? 
                    renderMainProducts() 
                    : showProd == 2 ?
                    <InventoryLog/>
                    : showProd == 3 ?
                    <TransactionLog/>
                    : showProd == 4 ? 
                    <UserManagement/>
                    : <BarChart/>
                  }
                </>
                : <AdminBranch/>

              }
            </div>
        </div>
     );
}

const MapstatetoProps=({Auth})=>{
  return {
    ...Auth, role: Auth.role
  }
}

export default connect(MapstatetoProps, {}) (Admin);