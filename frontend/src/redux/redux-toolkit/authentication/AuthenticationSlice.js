import { createSlice } from '@reduxjs/toolkit'
import ApiService from '../../../services/base/ApiService'
import SecureLS from 'secure-ls';


const secureLS = new SecureLS();

let initialLoginState = {
    isLoggedIn: false,
    userId: undefined,
    username: undefined,
    jwttoken: undefined,
    password: undefined,
    email: undefined,
    role: undefined,
    image: undefined,
}

const getStateFromStorage = () => {
    const auth = secureLS.get("auth");


    if (auth) {
        initialLoginState = { ...auth };
    }
    ApiService.changeAuthToken(auth.jwttoken);
    return initialLoginState;
}

getStateFromStorage();




export const updateStateInStorage = newState => {
    secureLS.set("auth", newState);
    //localStorage.setItem("auth", JSON.stringify(newState));
}

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState: initialLoginState,
    reducers: {
        login: (state, action) => {

            state.isLoggedIn = true;
            state.userId = action.payload.userId;
            state.username = action.payload.username;
            state.jwttoken = action.payload.jwttoken;
            state.password = action.payload.password;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.image = action.payload.image;
            updateStateInStorage({ ...state });
        },
        logout: (state, action) => {
            state.isLoggedIn = false;
            state.userId = undefined;
            state.username = undefined;
            state.jwttoken = undefined;
            state.password = undefined;
            state.email = undefined;
            state.role = undefined;
            state.image = undefined;
            updateStateInStorage({ ...state });

        }
    },
})


export const loginAsync = payload => async dispatch => {

    if (payload) {
        const authState = {
            ...payload.data,
            isLoggedIn: true,
            password: payload.password
        }
        ApiService.changeAuthToken(payload.data.jwttoken);
        dispatch(login(authState));
    }

};


export const logoutAsync = payload => async dispatch => {
    await dispatch(logout(payload));
};

export const { login, logout } = authenticationSlice.actions;

export const selectedAuthentication = state => state.authentication;

export default authenticationSlice.reducer