import { createStore, applyMiddleware, compose } from 'redux'
import Immutable, { Iterable } from 'immutable'
import thunk from 'redux-thunk'
import { routerMiddleware, push } from 'react-router-redux'
import createLogger from 'redux-logger'
import rootReducer from '../core'

import * as counterActions from '../core/counter'

const actionCreators = {
  ...counterActions,
  push,
}


const stateTransformer = (state) => {
  if (Iterable.isIterable(state)) {
    return state.toJS()
  }
  return state
}

const logger = createLogger({
  level: 'info',
  collapsed: true,
  stateTransformer,
})

const router = routerMiddleware(history)

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
    actionCreators,
  }) :
  compose
/* eslint-enable no-underscore-dangle */
const enhancer = composeEnhancers(
  applyMiddleware(thunk, router, logger),
)

export default function configureStore(initialState = Immutable.Map()) {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('../core', () =>
      store.replaceReducer(require('../core')), // eslint-disable-line global-require
    )
  }

  return store
}
