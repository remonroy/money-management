import {createStore,applyMiddleware} from 'redux'
import rootReducer from './reducers/rootReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'

const middleware = applyMiddleware(thunk)

const store =createStore(rootReducer,composeWithDevTools(middleware))

export default store 
