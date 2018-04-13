import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { ContextMenu } from '@blueprintjs/core'

import TrackContextMenu from 'features/TrackContextMenu'
import Clip from 'features/Clip'

import Track from 'core/models/track'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import trackMouseInteraction, { TrackMouseInteraction } from 'core/stores/interactions/tracks/mouse'

const styles = require('./styles.less')

interface Props {
  track: Track
  index: number
}

interface State {
  isContextMenuOpen: boolean
}

interface InjectedProps extends Props {
  sequencerViewStore: SequencerViewStore
  trackMouseInteraction: TrackMouseInteraction
}

@inject(() => ({
  trackMouseInteraction,
  sequencerViewStore,
}))
@observer
export default class TrackContainer extends Component<Props, State> {
  get injected() {
    return this.props as InjectedProps
  }

  handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { track } = this.props
    const { trackMouseInteraction } = this.injected
    trackMouseInteraction.handleTrackClick(track, event)
  }

  renderContextMenu = (offsetX: number) => {
    const { track } = this.props

    return <TrackContextMenu trackId={track.id} offsetX={offsetX} />
  }

  showContextMenu = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    const props = { left: e.clientX, top: e.clientY }
    const callback = () => this.setState({ isContextMenuOpen: false })
    ContextMenu.show(this.renderContextMenu(e.nativeEvent.offsetX), props, callback)
    this.setState({ isContextMenuOpen: true })
  }

  render() {
    const { track } = this.props
    const { sequencerViewStore } = this.injected
    const { trackHeight, trackWidth } = sequencerViewStore.tracks

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    }

    return (
      <div
        className={styles.trackContainer}
        style={trackStyle}
        onMouseDown={this.handleClick}
        onContextMenu={this.showContextMenu}
      >
        {track.clips.map((clip, index) => <Clip clip={clip} key={index} />)}
      </div>
    )
  }
}
