import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";

import rootReducer from "./root-reducer";


// middleware - whenever action get fired or dispatched we can catch them and then display them.

const middlewares = [logger];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;