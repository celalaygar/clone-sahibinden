import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/AuthenticationSlice';
import SecureLS from 'secure-ls';
import ApiService from '../../services/base/ApiService';

const secureLS = new SecureLS();


export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        authentication: authenticationReducer
    },
})
