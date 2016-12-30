import Immutable from 'immutable'

export const INCREMENT_COUNTER = 'counter/INCREMENT_COUNTER'
export const DECREMENT_COUNTER = 'counter/DECREMENT_COUNTER'

const initialState = Immutable.fromJS({
  count: 0,
})

export default function reducer(state = initialState, action) {
  const count = state.get('count')

  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.set('count', count + 1)
    case DECREMENT_COUNTER:
      return state.set('count', count - 1)
    default:
      return state
  }
}

export function increment() {
  return {
    type: INCREMENT_COUNTER,
  }
}

export function decrement() {
  return {
    type: DECREMENT_COUNTER,
  }
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const state = getState()
    const count = state.getIn(['counter', 'count'])

    if (count % 2 === 0) {
      return
    }

    dispatch(increment())
  }
}

export function incrementAsync(delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment())
    }, delay)
  }
}
