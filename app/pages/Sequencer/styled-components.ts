import styled from 'styled-components'
import * as sequencer from 'styles/sequencer'

export const PageContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #232c39;
  background-image: linear-gradient(45deg, rgba(0, 216, 255, 0.5) 10%, rgba(0, 1, 127, 0.7));

  ::-webkit-scrollbar {
    width: 0px; /* remove scrollbar space */
    height: 0px;
  }
`

export const TracksTimelineContainer = styled.div`
  position: absolute;

  width: 100%;
  height: ${sequencer.tracksTimelineHeight};

  top: ${sequencer.toolbarHeight};
  left: ${sequencer.trackHeadersWidth};

  overflow: scroll;
`

export const TracksTimelineWrapper = styled.div`
  /* Empty div for proper scrollbar positioning
`
