import {combineReducers} from 'redux';
import authReducers from './authReducer';
import transactionReducer from './transactionReducer';

const rootReducers = combineReducers({
    auth: authReducers,
    transactions : transactionReducer,
})

export default rootReducers