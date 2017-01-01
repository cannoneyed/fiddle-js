import { createStore, applyMiddleware, compose } from 'redux'
import Immutable, { Iterable } from 'immutable'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../core'

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

const enhancer = compose(
  applyMiddleware(thunk, logger),
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
