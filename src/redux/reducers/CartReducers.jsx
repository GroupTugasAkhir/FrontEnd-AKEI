const INITIAL_STATE = {
    user_id: 0,
    cartLength: 0
}

export default (state = INITIAL_STATE, action)=> {
    switch (action.type) {
        case 'GET':
            return {...state,...action.payload}
        case 'CLEAR':
            return INITIAL_STATE
        default:
            return state
    }
}