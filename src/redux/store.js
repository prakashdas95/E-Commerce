/* eslint-disable import/no-anonymous-default-export */
import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import rootReducer from "./root-reducer";

import rootSaga from './root.sagas';

const sagaMiddleware = createSagaMiddleware();

// middleware - whenever action get fired or dispatched we can catch them and then display them.
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
}

export const store = createStore(rootReducer, applyMiddleware(...middlewares));

sagaMiddleware.run(rootSaga);

export const persistor = persistStore(store);


export default { store, persistor };