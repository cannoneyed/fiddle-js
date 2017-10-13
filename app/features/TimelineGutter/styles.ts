import { style } from 'typestyle'
import * as sequencer from 'styles/sequencer'

export const timelineGutterContainer = style({
  $debugName: 'timelineGutterContainer',
  position: 'relative',
  height: sequencer.timelineHeight,
  padding: 0,
  zIndex: sequencer.zIndices.timeline,
  flexGrow: 0,
  backgroundColor: 'purple',
})
