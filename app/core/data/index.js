import Immutable from 'immutable'

import { CREATE_TRACK, DELETE_TRACK } from 'core/tracks'

const initialState = Immutable.Map()

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRACK: {
      const { id, type } = action.payload
      return state.setIn([type, id], action.payload)
    }
    case DELETE_TRACK: {
      const { id, type } = action.payload
      return state.deleteIn([type, id])
    }
    default:
      return state
  }
}
