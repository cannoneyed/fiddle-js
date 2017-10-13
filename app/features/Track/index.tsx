import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import TrackContextMenu from 'features/TrackContextMenu'
import Clip from 'features/Clip'

import Track from 'core/models/track'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import trackMouseInteraction, { TrackMouseInteraction } from 'core/interactions/tracks/mouse'

const styles = require('./styles.less')

interface ComponentProps {
  track: Track
  index: number
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackMouseInteraction: TrackMouseInteraction
}

@inject(() => ({
  trackMouseInteraction,
  sequencerViewStore,
}))
@ContextMenuTarget
@observer
export default class TrackContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { track } = this.props
    const { trackMouseInteraction } = this.injected
    trackMouseInteraction.handleTrackClick(track, event)
  }

  @autobind
  renderContextMenu(event: React.MouseEvent<HTMLElement>) {
    const { track } = this.props
    const { offsetX } = event.nativeEvent

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />
  }

  render() {
    const { track } = this.props
    const { sequencerViewStore } = this.injected
    const { trackHeight, trackWidth } = sequencerViewStore

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    }

    return (
      <div className={styles.trackContainer} style={trackStyle} onMouseDown={this.handleClick}>
        {track.clips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </div>
    )
  }
}
