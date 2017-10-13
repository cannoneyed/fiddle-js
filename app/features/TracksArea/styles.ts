import { style } from 'typestyle'
import * as sequencer from 'styles/sequencer'

export const tracksAreaContainer = style({
  $debugName: 'tracksAreaContainer',
  overflow: 'hidden',
  flexGrow: 1,
  backgroundColor: 'cornflowerblue',
  position: 'relative',

  transform: 'translate3D(0, 0, 0)',
  backfaceVisibility: 'hidden',
})

export const gridContainer = style({
  $debugName: 'gridContainer',
  position: 'absolute',
  top: 0,
  zIndex: sequencer.zIndices.verticalGrid,
})

export const tracksContainer = style({
  $debugName: 'tracksContainer',
  position: 'absolute',
  top: 0,
  zIndex: sequencer.zIndices.tracks,
  width: '100%',
})
