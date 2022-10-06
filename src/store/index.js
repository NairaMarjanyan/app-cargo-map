import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import reduxThunk from "redux-thunk";
import companiesReducer from "./reducers/companies.reducer";

function createReducer(asyncReducers) {
    return combineReducers({
        ...staticReducers,
        ...asyncReducers
    });
}

// Define the Reducers that will always be present in the application
const staticReducers = {
    companiesReducer
};

const middlewares = [reduxThunk];
const middlewareEnhancer = applyMiddleware(...middlewares);

const enhancers = [middlewareEnhancer];

if (process.env.NODE_ENV !== "production") {
    if (typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION__) {
        enhancers.push(window.__REDUX_DEVTOOLS_EXTENSION__());
    }
}

const composedEnhancers = compose(...enhancers);

const store = createStore(createReducer(), composedEnhancers);

// Add a dictionary to keep track of the registered async reducers
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
    if (store.asyncReducers[key]) {
        return;
    }
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(createReducer(store.asyncReducers));
};

export default store;
