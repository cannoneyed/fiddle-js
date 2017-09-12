import styled from 'styled-components'
import * as sequencer from 'styles/sequencer'
import { withProps } from 'wrappers/styled-components'

export const TimelineWrapper = styled.div`
  height: ${sequencer.timelineHeight};
  padding: 0;
  position: relative;
  z-index: ${sequencer.timelineZ};
`

export const TimelineSegmentsWrapper = styled.div`
  display: flex;
  flex-direction: row;
`

interface ITimelineSegment {
  gridSegmentWidth: number
}

export const TimelineSegment = withProps<ITimelineSegment, HTMLDivElement>(styled.div)`
  background-color: gray;
  height: @timelineHeight;
  border-right: solid 1px white;
  padding-left: 5px;

  min-width: ${props => props.gridSegmentWidth}px;

  :first-child {
    border-left: solid 1px white;
  }
`
