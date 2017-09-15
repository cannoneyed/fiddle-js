import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import TrackContextMenu from 'features/TrackContextMenu'
import Clip from 'features/Clip'

import Track from 'core/models/track'
import { SequencerViewStore } from 'core/stores/sequencer/view'
import { TrackMouseInteraction } from 'core/interactions/tracks/mouse'

import { TrackWrapper } from './styled-components'

interface ComponentProps {
  track: Track
  index: number
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackMouseInteraction: TrackMouseInteraction
}

@inject('trackMouseInteraction', 'sequencerViewStore')
@ContextMenuTarget
@observer
export default class TrackContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { track } = this.props
    const { handleTrackClick } = this.injected.trackMouseInteraction
    handleTrackClick(track, event)
  }

  renderContextMenu(event: React.MouseEvent<HTMLElement>) {
    const { track } = this.props
    const { offsetX } = event.nativeEvent

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />
  }

  render() {
    const { track } = this.props
    const { trackHeight, trackWidth } = this.injected.sequencerViewStore

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    }

    return (
      <TrackWrapper style={trackStyle} onMouseDown={this.handleClick}>
        {track.clips.map((clip, index) => <Clip clip={clip} key={clip.id} />)}
      </TrackWrapper>
    )
  }
}
