import styled from 'styled-components'
import { withProps } from 'wrappers/styled-components'

interface ITimelineSegment {
  height: number
}

export const TrackHeaderWrapper = withProps<ITimelineSegment, HTMLDivElement>(styled.div)`
  width: 100%;
  background-color: green;
  border-bottom: 1px solid white;
  height: ${props => props.height};
`
