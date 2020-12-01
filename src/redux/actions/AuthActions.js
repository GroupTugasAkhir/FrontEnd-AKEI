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
            dispatch({type: 'ERROR', payload: err.response.data.message})
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
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: 'LOGIN', payload: res.data})
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
                localStorage.setItem('user', JSON.stringify(res.data))
                dispatch({type: 'LOGIN', payload: res.data})
            }).catch((err)=> {
                dispatch({type: 'ERROR', payload: err.response.data.message})
                console.log(err.response.data.message);
            })
        }
    }
}

export const FirebaseAuth = (dataUserFirebase) => {
    return(dispatch)=> {
        Axios.post(`${API_URL_SQL}/auth/firebaseauth`,dataUserFirebase)
        .then((res)=> {
            console.log(res.data);
            localStorage.setItem('user', JSON.stringify(res.data))
            dispatch({type: 'LOGIN', payload: res.data})
        }).catch((err)=> {
            console.log(err);
            dispatch({type: 'ERROR', payload: err.response.data.message})
        })
    }
}