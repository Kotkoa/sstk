import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import state from './states'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    state
  })

export default createRootReducer
