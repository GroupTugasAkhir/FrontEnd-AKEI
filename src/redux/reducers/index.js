import {combineReducers} from 'redux'
import Authreducers from './AuthReducers'

export default combineReducers({
    Auth: Authreducers,
})