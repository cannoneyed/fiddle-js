import styled from 'styled-components'
import { withProps } from 'wrappers/styled-components'

export const GridWrapper = styled.div`
  display: flex;
  flex-direction: row;
  z-index: 0;
  position: absolute;
  height: 100%;
  top: 0;
`

interface IGridSegment {
  minWidth: number
}

export const GridSegment = withProps<IGridSegment, HTMLDivElement>(styled.div)`
  background-color: #aaa;
  border-right: solid 1px white;
  padding-left: 5px;

  min-width: ${props => props.minWidth}px;

  &:first-child {
    border-left: solid 1px white;
  }
`
