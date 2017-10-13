import { style } from 'typestyle'

export const pageWrapper = style({
  $debugName: 'pageWrapper',
  position: 'absolute',
  width: '100%',
  height: '100%',
  backgroundColor: '#232c39',
  backgroundImage: 'linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7))',
})

export const toolbarWrapper = style({
  $debugName: 'toolbarWrapper',
  width: '100%',
})

export const timelineWrapper = style({
  $debugName: 'timelineWrapper',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})

export const tracksAreaWrapper = style({
  $debugName: 'tracksAreaWrapper',
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
})
