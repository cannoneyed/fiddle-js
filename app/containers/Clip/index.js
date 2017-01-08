import React, { Component, PropTypes } from 'react'
import { DragSource } from 'react-dnd'
import autobind from 'autobind-decorator'
import classnames from 'classnames'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'containers/ClipContextMenu'

import styles from './styles.less'

import sequencerViewStore from 'core/stores/sequencer/view'
import sequencerInteractionStore from 'core/stores/sequencer/interaction'

const clipSource = {
  beginDrag(props) {
    return {
      text: props.text
    }
  }
}

@inject(() => ({
  handleClipMouseDown: sequencerInteractionStore.handleClipMouseDown,
  handleClipMouseUp: sequencerInteractionStore.handleClipMouseUp,
  trackHeight: sequencerViewStore.trackHeight,
}))
@DragSource('Clip', clipSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
}))
@ContextMenuTarget
@observer
export default class ClipContainer extends Component {
  static propTypes = {
    handleClipMouseDown: PropTypes.func.isRequired,
    handleClipMouseUp: PropTypes.func.isRequired,
    trackHeight: PropTypes.number.isRequired,
    clip: ObsPropTypes.observableObject.isRequired,

    // React-dnd
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired
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
      connectDragSource,
      handleClipMouseDown,
      handleClipMouseUp,
      isDragging,
      trackHeight } = this.props

    const clipStyle = {
      height: trackHeight,
      width: clip.width,
      left: clip.offsetX,
      opacity: isDragging ? 0.5 : 1,
    }

    const className = classnames(
      styles.clipContainer,
      clip.selected ? styles.selected : null,
    )

    return connectDragSource(
      <div
        className={ className }
        style={ clipStyle }
        onMouseDown={ (event) => handleClipMouseDown(clip, event) }
        onMouseUp={ (event) => handleClipMouseUp(clip, event) }
      />
    )
  }
}
