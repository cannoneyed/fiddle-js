import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'

import styles from './styles.less'

import sequencerViewStore from 'core/sequencer/view'
import sequencerInteractionStore from 'core/sequencer/interaction'

@inject(() => ({
  handleClipClick: sequencerInteractionStore.handleClipClick,
  trackHeight: sequencerViewStore.trackHeight,
}))
@observer
@ContextMenuTarget
export default class ClipContainer extends Component {
  static propTypes = {
    handleClipClick: PropTypes.func.isRequired,
    trackHeight: PropTypes.number.isRequired,
    clip: ObsPropTypes.observableObject.isRequired,
  }

  handleClick = (event) => {
    const { clip, handleClipClick } = this.props
    handleClipClick(clip, event)
  }

  @autobind // Need to autobind because this method must be a class method, not babel-transformed
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

    const className = classnames(
      styles.clipContainer,
      clip.selected ? styles.selected : null,
    )

    console.log('🍕', clip.selected)

    return (
      <div
        className={ className }
        style={ clipStyle }
        onMouseDown={ this.handleClick }
      />
    )
  }
}
