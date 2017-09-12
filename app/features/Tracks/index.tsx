import * as React from 'react'
import { inject, observer } from 'mobx-react'

import Track from 'features/Track'
import VerticalGrid from 'components/VerticalGrid'

import { SequencerViewStore } from 'core/stores/sequencer/view'
import { TrackStore } from 'core/stores/tracks'

import { TracksSectionWrapper, TracksContainer } from './styled-components'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackStore: TrackStore
}

@inject('trackStore', 'sequencerViewStore')
@observer
export default class Tracks extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackList } = this.injected.trackStore
    const { gridCount, gridSegmentWidth } = this.injected.sequencerViewStore

    return (
      <TracksSectionWrapper>
        <VerticalGrid gridCount={gridCount} gridSegmentWidth={gridSegmentWidth} />
        <TracksContainer id="tracksContainer">
          {trackList.map((track, index) => <Track track={track} index={index} key={track.id} />)}
        </TracksContainer>
      </TracksSectionWrapper>
    )
  }
}
