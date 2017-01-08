import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'

import styles from './styles.less'

import sequencerViewStore from 'core/stores/sequencer/view'
import sequencerInteractionStore from 'core/stores/sequencer/interaction'

@inject(() => ({
  handleClipMouseDown: sequencerInteractionStore.handleClipMouseDown,
  trackHeight: sequencerViewStore.trackHeight,
}))
@ContextMenuTarget
@observer
export default class ClipContainer extends Component {
  static propTypes = {
    handleClipMouseDown: PropTypes.func.isRequired,
    trackHeight: PropTypes.number.isRequired,
    clip: ObsPropTypes.observableObject.isRequired,
  }

  @autobind // Need to autobind because this method must be a class method, not babel-transformed
  renderContextMenu() {
    const { clip } = this.props
    return (
      <ClipContextMenu clipId={ clip.id } />
    )
  }

  render() {
    const {
      clip,
      handleClipMouseDown,
      trackHeight
    } = this.props

    const clipStyle = {
      height: trackHeight,
      width: clip.width,
      left: clip.offsetX,
    }

    const className = classnames(
      styles.clipContainer,
      clip.selected ? styles.selected : null,
    )

    return (
      <div
        className={ className }
        style={ clipStyle }
        onMouseDown={ (event) => handleClipMouseDown(clip, event) }
      />
    )
  }
}
