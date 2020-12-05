const INITIAL_STATE = {
    username: '',
    email: '',
    password: '',
    user_id: 0,
    isLogin: false,
    isLoading: false,
    error: '',
    cart: [],
    role: 0
}

export default (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case 'LOGIN':
            return {...state,...action.payload, isLogin: true, isLoading: false, cart: action.cart}
        case 'REGISTER':
            return {...state,...action.payload, isLogin: true, isLoading: false}
        case 'LOGOUT':
            return INITIAL_STATE
        case 'LOADING':
            return {...state, isLoading: true}
        case 'ERROR':
            return {...state, error: action.payload, isLoading: false}
        case 'ADMIN':
            return {...state, superadmin: action.payload}
        default:
            return state
    }
}