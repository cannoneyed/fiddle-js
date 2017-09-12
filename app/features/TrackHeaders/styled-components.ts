import styled from 'styled-components'
import * as sequencer from 'styles/sequencer'

export const SectionWrapper = styled.div`
  position: absolute;
  top: ${sequencer.toolbarHeight};

  height: ${sequencer.tracksTimelineHeight};
  width: ${sequencer.trackHeadersWidth};
  background-color: red;
  overflow: hidden;
`

export const Header = styled.div`
  position: absolute;
  top: 0;
  height: ${sequencer.timelineHeight};
  z-index: ${sequencer.timelineZ};
  width: 100%;
  background-color: blue;
`

export const HeadersWrapper = styled.div`
  position: absolute;
  top: ${sequencer.timelineHeight};
  width: 100%;
`
