import { style } from 'typestyle'
import * as sequencer from 'styles/sequencer'

export const verticalGridContainer = style({
  $debugName: 'verticalGridContainer',
  display: 'flex',
  flexDirection: 'row',
  zIndex: sequencer.zIndices.verticalGrid,
  height: '100%',
})

export const gridSegment = style({
  $debugName: 'gridSegment',
  backgroundColor: '#aaa',
  borderRight: 'solid 1px white',
  paddingLeft: 5,
  $nest: {
    '&:first-child': {
      borderLeft: 'solid 1px white',
    },
  },
})
