/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from 'redux-persist';


import rootReducer from "./root-reducer";



// middleware - whenever action get fired or dispatched we can catch them and then display them.

const middlewares = [];

if (process.env.NODE_ENV === 'production') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);


export default { store, persistor };