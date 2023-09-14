import { configureStore } from '@reduxjs/toolkit'
import authenticationReducer from './authentication/AuthenticationSlice';
import { createLogger } from 'redux-logger'


function logFilter(getState, action) {
    return window.enableFireflyReduxLogging;
}
var collapsedLogging = [
    'ExternalAccessCntlr/extensionActivate'
];

function collapsedFilter(getState, action) {
    return collapsedLogging.includes(action.type);
}
const logger = createLogger({ duration: true, predicate: logFilter, collapsed: collapsedFilter }); // developer can add for debugging

export const store = configureStore({
    reducer: {
        //counter: counterReducer,
        authentication: authenticationReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
})
