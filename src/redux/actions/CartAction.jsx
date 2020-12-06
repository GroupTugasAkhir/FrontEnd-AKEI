import Axios from 'axios'
import {API_URL_SQL} from './../../helpers/apiurl'

export const CartThunk = (user_id) => {
    return (dispatch)=> {
        Axios.get(`${API_URL_SQL}/cart/cartLength/${user_id}`)
        .then((res)=>{
            let obj = {
                user_id: user_id,
                cartLength: res.data[0].cart
            }
            localStorage.setItem("cart_length",res.data[0].cart)
            dispatch({type: 'GET',payload: obj})
        }).catch((err)=> dispatch({type: 'ERROR'}))
    }
}