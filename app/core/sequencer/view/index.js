import Immutable from 'immutable'
import { createSelector } from 'reselect'

import * as sequencerStateSelectors from '../state'

// Action types
export const SET_HORIZONTAL_ZOOM_LEVEL = 'sequencer/view/SET_HORIZONTAL_ZOOM_LEVEL'
export const SET_PLAYHEAD_POSITION = 'sequencer/view/SET_PLAYHEAD_POSITION'
export const ZOOM_IN_HORIZONTAL = 'sequencer/ZOOM_IN_HORIZONTAL'
export const ZOOM_OUT_HORIZONTAL = 'sequencer/ZOOM_OUT_HORIZONTAL'

const initialState = Immutable.fromJS({
  zoomLevel: {
    horizontal: 1,
    vertical: 1,
  },
  playheadPosition: 0,
})

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_HORIZONTAL_ZOOM_LEVEL: {
      return state.setIn(['zoomLevel'], action.payload)
    }
    case SET_PLAYHEAD_POSITION: {
      return state.set('playheadPosition', action.payload)
    }
    case ZOOM_IN_HORIZONTAL: {
      const zoomLevel = state.getIn(['zoomLevel', 'horizontal'])
      return state.setIn(['zoomLevel', 'horizontal'], zoomLevel + 0.1)
    }
    case ZOOM_OUT_HORIZONTAL: {
      const zoomLevel = state.getIn(['zoomLevel', 'horizontal'])
      return state.setIn(['zoomLevel', 'horizontal'], zoomLevel - 0.1)
    }
    default:
      return state
  }
}

// Action creators
export function setZoomLevel(zoomLevel) {
  return { type: SET_HORIZONTAL_ZOOM_LEVEL, payload: zoomLevel }
}

export function zoomInHorizontal() {
  return { type: ZOOM_IN_HORIZONTAL }
}

export function zoomOutHorizontal() {
  return { type: ZOOM_OUT_HORIZONTAL }
}

export function setPlayheadPosition(playheadPosition) {
  return { type: SET_PLAYHEAD_POSITION, payload: playheadPosition }
}

// Selectors
export const getSequencerViewState = (state) => state.getIn(['sequencer', 'view'])

export const getZoomLevel = createSelector(
  getSequencerViewState, (state) => state.get('zoomLevel'),
)

export const getHorizontalZoomLevel = createSelector(
  getZoomLevel, (zoomLevel) => zoomLevel.get('horizontal'),
)

export const getVerticalZoomLevel = createSelector(
  getZoomLevel, (zoomLevel) => zoomLevel.get('vertical'),
)

export const getPlayheadPosition = createSelector(
  getSequencerViewState, (state) => state.get('playheadPosition'),
)

// The default zoom level (1) means that 2 bars will fit in the space of 100px
export const getGridWidth = createSelector(
  getHorizontalZoomLevel,
  (zoomLevel) => {
    return (50 * zoomLevel)
  },
)

export const getGridCount = createSelector(
  getHorizontalZoomLevel,
  sequencerStateSelectors.getTimelineLength,
  (zoomLevel, timelineLength) => {
    return timelineLength
  },
)
