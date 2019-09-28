import Thunk from 'redux-thunk'
import {createStore,applyMiddleware} from 'redux'
import Reducers from './reducers'

export default createStore(Reducers,applyMiddleware(Thunk))