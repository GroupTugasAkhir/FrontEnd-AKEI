const INITIAL_STATE = {
    adminData: ''
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'GETTRX':
            return {...state, adminData: action.payload}
        default:
            return state
    }
}