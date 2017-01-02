import Immutable from 'immutable'
import { createSelector } from 'reselect'

import * as sequencerStateSelectors from '../state'

// Action types
export const SET_ZOOM_LEVEL = 'sequencer/view/SET_ZOOM_LEVEL'
export const SET_PLAYHEAD_POSITION = 'sequencer/view/SET_PLAYHEAD_POSITION'

const initialState = Immutable.fromJS({
  zoomLevel: 1,
  playheadPosition: 0,
})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_ZOOM_LEVEL: {
      return state.set('zoomLevel', action.payload)
    }
    case SET_PLAYHEAD_POSITION: {
      return state.set('playheadPosition', action.payload)
    }
    default:
      return state
  }
}

// Action creators
export function setZoomLevel(zoomLevel) {
  return { type: SET_ZOOM_LEVEL, payload: zoomLevel }
}

export function setPlayheadPosition(playheadPosition) {
  return { type: SET_PLAYHEAD_POSITION, payload: playheadPosition }
}

// Selectors
export const getSequencerViewState = (state) => state.getIn(['sequencer', 'view'])

export const getZoomLevel = createSelector(
  getSequencerViewState,
  (state) => state.get('zoomLevel'),
)

export const getPlayheadPosition = createSelector(
  getSequencerViewState,
  (state) => state.get('playheadPosition'),
)

// The default zoom level (1) means that 2 bars will fit in the space of 100px
export const getGridWidth = createSelector(
  getZoomLevel,
  (zoomLevel) => {
    return (50 * zoomLevel)
  },
)

export const getGridCount = createSelector(
  getZoomLevel,
  sequencerStateSelectors.getTimelineLength,
  (zoomLevel, timelineLength) => {
    return timelineLength
  },
)
