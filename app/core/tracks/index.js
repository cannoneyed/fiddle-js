import Immutable from 'immutable'
import { generateId } from 'utils/id'

// Action types
export const CREATE_TRACK = 'tracks/CREATE_TRACK'
export const DELETE_TRACK = 'tracks/DELETE_TRACK'

const initialState = Immutable.List()

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_TRACK: {
      const { id, type } = action.payload
      return state.unshift({ type, id })
    }
    case DELETE_TRACK: {
      const { id } = action.payload
      return state.filter(track => track.id !== id)
    }
    default:
      return state
  }
}

// Action creators
export function createTrack() {
  const id = generateId()
  return { type: CREATE_TRACK, payload: { id, type: 'track' } }
}

export function deleteTrack(id) {
  return { type: DELETE_TRACK, payload: { id } }
}

// Selectors
export const getTrackList = (state) => {
  return state.get('tracks')
}
