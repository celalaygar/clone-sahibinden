import * as ACTIONS from "./Constants";

const defaultState = {
    isLoggedIn: false,
    userId:undefined,
    username: undefined,
    jwttoken: undefined,
    password: undefined,
    email: undefined,
    role: undefined,
    image: undefined
}

const authReducer = (state = { ...defaultState }, action) => {
    if (action.type === ACTIONS.LOGOUT_ACTION) {
        return defaultState;
    }
    if (action.type ===  ACTIONS.LOGIN_ACTION ) {
        return {
            ...action.payload
        };
    }
    if(action.type === ACTIONS.UPDATE_ACTION){
        return {...action.payload};
    }
    return state;
};

export default authReducer;