import { style } from 'typestyle'
import * as sequencer from 'styles/sequencer'

export const tracksGutterContainer = style({
  $debugName: 'tracksGutterContainer',
  overflow: 'hidden',
  position: 'relative',
  zIndex: sequencer.zIndices.tracks,
  padding: 0,
  flexGrow: 0,

  backgroundColor: 'red',

  transform: 'translate3D(0, 0, 0)',
  backfaceVisibility: 'hidden',
})
