import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'

export const RegisThunk = (regisData) => {
    return (dispatch)=> {
        dispatch({type: 'LOADING'})
        Axios.post(`${API_URL_SQL}/auth/register`,regisData)
        .then((res)=> {
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: 'REGISTER', payload: res.data})
        }).catch((err)=> {
            dispatch({type: 'ERROR'})
        })
    }
}

export const verifiedAction = (newDataIn) => {
    return {
        type: 'LOGIN',
        payload: newDataIn
    }
}

export const LoginThunk = (loginData) => {
    return (dispatch)=> {
        dispatch({type: 'LOADING'})
        Axios.post(`${API_URL_SQL}/auth/login`,loginData)
        .then((res)=> {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data.dataLogin))
            dispatch({type: 'LOGIN', payload: res.data.dataLogin, cart: res.data.dataCart})
        }).catch((err)=> {
            console.log(err);
            dispatch({type: 'ERROR', payload: err.response.data.message})
        })
    }
}

export const KeepLogin = () => {
    return (dispatch)=> {
        dispatch({type: 'LOADING'})
        let datauser = localStorage.getItem('user')
        
        if(datauser){
            datauser = JSON.parse(datauser)
            Axios.get(`${API_URL_SQL}/auth/keepLogin/${datauser.user_id}`)
            .then((res)=> {
                // console.log(res.data.dataCart);

                Axios.get(`${API_URL_SQL}/cart/cartLength/${datauser.user_id}`)
                .then((res2)=>{
                    let obj = {
                        user_id: datauser.user_id,
                        cartLength: res2.data[0].cart
                    }
                    localStorage.setItem("cart_length",res2.data[0].cart)
                    dispatch({type: 'GET',payload: obj})

                    localStorage.setItem('user', JSON.stringify(res.data.dataLogin))
                    console.log(res.data.dataCart);
                    dispatch({type: 'LOGIN', payload: res.data.dataLogin, cart: res.data.dataCart})
                }).catch((err)=> dispatch({type: 'ERROR'}))

            }).catch((err)=> {
                dispatch({type: 'ERROR'})
                console.log(err);
            })
        }
    }
}

export const FirebaseAuth = (dataUserFirebase) => {
    return(dispatch)=> {
        Axios.post(`${API_URL_SQL}/auth/firebaseauth`,dataUserFirebase)
        .then((res)=> {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data.dataLogin))
            dispatch({type: 'LOGIN', payload: res.data.dataLogin, cart: res.data.dataCart})
        }).catch((err)=> {
            console.log(err);
            dispatch({type: 'ERROR', payload: err.response.data.message})
        })
    }
}

export const changeAdmin = (bool) => {
    return {
        type: 'ADMIN',
        payload: bool
    }
}

export const LogoutFunc=(obj)=>{
    return{
        type:'LOGOUT',
        payload:obj
    }
}