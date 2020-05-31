// import { configureStore } from '@reduxjs/toolkit';
// import productReducer from './components/Product/ProductSlice';
// //import counterReducer from './features/counter/counterSlice';
// import thunk from 'redux-thunk';
// const stateFromStorage = JSON.parse(localStorage.getItem('reduxToolkit_store')) || {};
// const store = configureStore({
//     reducer: {
//         //DetailID: productReducer,
//         // todos: todosReducer
//     },
//     stateFromStorage,
//     middleware: [thunk],
// });

// store.subscribe(() => {
//     console.log('Store update: ', store.getState());
//     const newState = store.getState();
//     //localStorage.setItem('reduxToolkit_store', JSON.stringify(newState))
//     localStorage.setItem('reduxToolkit_store', JSON.stringify(newState))
// });
// export default store;
import { createStore, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import rootReducer from "./reducers";

//const rootReducer = {}
const stateFromStorage = JSON.parse(localStorage.getItem('redux_storeShop')) || {};
const middleware = applyMiddleware(thunk);

const store = createStore(
    rootReducer,
    stateFromStorage,
    middleware
);

store.subscribe(() => {
    console.log('Store update: ', store.getState());
    const newState = store.getState();
    localStorage.setItem('redux_storeShop', JSON.stringify(newState))
});

export default store;