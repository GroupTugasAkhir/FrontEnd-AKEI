import {combineReducers} from 'redux'
import Authreducers from './AuthReducers'
import CartReducers from './CartReducers'
import AdminReducers from './AdminReducers'

export default combineReducers({
    Auth: Authreducers,
    Cart: CartReducers,
    Admin: AdminReducers
})