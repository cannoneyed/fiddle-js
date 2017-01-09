import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'

import styles from './styles.less'

import sequencerViewStore from 'core/stores/sequencer/view'
import clipMouseInteractions from 'core/interactions/clips/mouse'

@inject(() => ({
  handleClipMouseDown: clipMouseInteractions.handleClipMouseDown,
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
      width: clip.width + 1,
      left: clip.offsetX - 1,
      borderColor: clip.isDragging ? 'red' : 'white',
    }

    const className = classnames(
      styles.clipContainer,
      clip.isSelected ? styles.isSelected : null,
    )

    return (
      <div
        id={ clip.domId }
        className={ className }
        style={ clipStyle }
        onMouseDown={ (event) => handleClipMouseDown(clip, event) }
      />
    )
  }
}
