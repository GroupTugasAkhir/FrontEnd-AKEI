import {combineReducers} from 'redux'
import Authreducers from './AuthReducers'
import CartReducers from './CartReducers'

export default combineReducers({
    Auth: Authreducers,
    Cart: CartReducers
})