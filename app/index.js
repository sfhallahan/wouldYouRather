import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { routerReducer, syncHistoryWithStore, ConnectedRouter } from 'react-router-redux'
import { createBrowserHistory } from 'history'
import * as reducers from 'redux/modules'
import getRoutes from 'config/routes'
import styles from './sharedStyles/styles.css'

const store = createStore(
  combineReducers({...reducers, routing: routerReducer}), compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
))

function checkAuth (nextState, replace) {
  const isAuthed = store.getState().users.isAuthed
  const isFetching = store.getState().users.isFetching
  if ( isFetching === true ) {
    return
  } else {
    return isAuthed
  }
}


const history = createBrowserHistory()

ReactDOM.render(
  <Provider store={store}>
      {getRoutes(checkAuth, history)}
  </Provider>,
  document.getElementById('app')
)
