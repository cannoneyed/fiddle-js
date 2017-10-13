import { style } from 'typestyle'

export const clipContainer = style({
  $debugName: 'clipContainer',
  backgroundColor: 'gray',
  border: 'solid 2px #ccc',
  position: 'absolute',
})

export const isSelected = style({
  $debugName: 'isSelected',
  backgroundColor: 'purple',
})
