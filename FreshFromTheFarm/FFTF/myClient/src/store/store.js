import { createStore, combineReducers } from 'redux';
import shopReducer from './reducers/shop'


const reducer = combineReducers({ shopReducer });



const store = createStore(reducer);
window.store = store;
export default store;

