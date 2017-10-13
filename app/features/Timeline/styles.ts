import { style } from 'typestyle'
import * as sequencer from 'styles/sequencer'

export const timelineContainer = style({
  $debugName: 'timelineContainer',
  height: sequencer.timelineHeight,
  padding: 0,
  position: 'relative',
  zIndex: sequencer.zIndices.timeline,
  flexGrow: 1,
  overflow: 'hidden',

  transform: 'translate3D(0, 0, 0)',
  backfaceVisibility: 'hidden',
})

export const timelineSegmentsContainer = style({
  $debugName: 'timelineSegmentsContainer',
  display: 'flex',
  flexDirection: 'row',
})

export const timelineSegment = style({
  $debugName: 'timelineSegment',
  backgroundColor: 'gray',
  height: sequencer.timelineHeight,
  borderRight: 'solid 1px white',
  paddingLeft: 5,
  $nest: {
    '&:first-child': {
      borderLeft: 'solid 1px white',
    },
  },
})
