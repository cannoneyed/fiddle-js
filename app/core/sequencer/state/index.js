import Immutable from 'immutable'
import { createSelector } from 'reselect'

// Action types
export const SET_TEMPO = 'sequencer/state/SET_TEMPO'
export const SET_TIMELINE_LENGTH = 'sequencer/state/SET_TIMELINE_LENGTH'
export const SET_TIME_SIGNATURE = 'sequencer/state/SET_TIME_SIGNATURE'

const initialState = Immutable.fromJS({
  tempo: 120,
  timelineLength: 64,
  timeSignature: {
    numerator: 4,
    denominator: 4,
  },
})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_TEMPO: {
      return state.set('tempo', action.payload)
    }
    case SET_TIMELINE_LENGTH: {
      return state.set('timelineLength', action.payload)
    }
    case SET_TIME_SIGNATURE: {
      return state.set('timeSignature', action.payload)
    }
    default:
      return state
  }
}

// Action creators
export function setTempo(tempo) {
  return { type: SET_TEMPO, payload: tempo }
}

export function setTimelineLength(timelineLength) {
  return { type: SET_TIMELINE_LENGTH, payload: timelineLength }
}

export function setTimeSignature(numerator, denominator) {
  return { type: SET_TIME_SIGNATURE, payload: { numerator, denominator } }
}

// Selectors
export const getSequencerState = (state) => state.getIn(['sequencer', 'state'])

export const getTempo = createSelector(
  getSequencerState,
  (state) => state.get('tempo'),
)

export const getTimelineLength = createSelector(
  getSequencerState,
  (state) => state.get('timelineLength'),
)

export const getTimeSignature = createSelector(
  getSequencerState,
  (state) => state.get('timeSignature'),
)
