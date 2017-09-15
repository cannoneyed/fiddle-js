import styled from 'styled-components'
import { withProps } from 'wrappers/styled-components'

interface IClipsWrapper {
  isDragging: boolean
  isSelected: boolean
  left: number
  height: number
  width: number
}

export const ClipWrapper = withProps<IClipsWrapper, HTMLDivElement>(styled.div)`
  background-color: ${props => (props.isSelected ? 'purple' : 'gray')};

  border: solid 2px #ccc;
  border-color: ${props => (props.isDragging ? 'red' : 'white')};

  position: absolute;
  left: ${props => props.left}px;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`