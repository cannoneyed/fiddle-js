import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'
import TrackContextMenu from 'containers/TrackContextMenu'

import sequencerViewStore from 'core/sequencer/view'

import styles from './styles.less'

@inject(() => ({
  trackHeight: sequencerViewStore.trackHeight,
  trackWidth: sequencerViewStore.trackWidth,
}))
@observer
@ContextMenuTarget
export default class TrackContainer extends Component {
  static propTypes = {
    trackId: PropTypes.string.isRequired,
    trackHeight: PropTypes.number.isRequired,
    trackWidth: PropTypes.number.isRequired,
  }

  @autobind
  renderContextMenu() {
    return (
      <TrackContextMenu trackId={ this.props.trackId } />
    )
  }

  render() {
    const { trackHeight, trackWidth } = this.props

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    }

    return (
      <div className={ styles.trackContainer } style={ trackStyle } />
    )
  }
}
