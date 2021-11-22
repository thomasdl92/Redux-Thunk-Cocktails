import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import cocktailsState from "./cocktails";
const rootReducer = combineReducers({
  cocktailsState
});

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
