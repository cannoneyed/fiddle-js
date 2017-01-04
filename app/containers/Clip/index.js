import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'

import styles from './styles.less'

import sequencerViewStore from 'core/sequencer/view'

@inject(() => ({
  trackHeight: sequencerViewStore.trackHeight,
}))
@observer
@ContextMenuTarget
export default class ClipContainer extends Component {
  static propTypes = {
    trackHeight: PropTypes.number.isRequired,
    clip: ObsPropTypes.observableObject.isRequired,
  }

  @autobind
  renderContextMenu() {
    const { clip } = this.props
    return (
      <ClipContextMenu clipId={ clip.id } />
    )
  }

  render() {
    const { clip, trackHeight } = this.props

    const clipStyle = {
      height: trackHeight,
      width: 100,
      left: clip.position,
    }

    return (
      <div className={ styles.clipContainer } style={ clipStyle } />
    )
  }
}
