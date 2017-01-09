import React, { Component, PropTypes } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import Portal from 'react-portal'

import Clip from 'components/Clip'

import styles from './styles.less'

import clipDrag from 'core/interactions/clips/drag'

@inject(() => ({
  dragDeltaX: clipDrag.dragDeltaX,
  dragDeltaY: clipDrag.dragDeltaY,
}))
@observer
export default class ClipDrag extends Component {
  static propTypes = {
    clip: ObsPropTypes.observableObject.isRequired,
    dragDeltaX: PropTypes.number.isRequired,
    dragDeltaY: PropTypes.number.isRequired,
  }

  render() {
    const {
      clip,
      dragDeltaX,
      dragDeltaY,
    } = this.props

    const style = {
      left: clip.dragStartX + dragDeltaX,
      top: clip.dragStartY + dragDeltaY,
    }

    return (
      <Portal isOpened={ clip.isDragging }>
        <div className={ styles.clipDragWrapper } style={ style }>
          <Clip clip={ clip } />
        </div>
      </Portal>
    )
  }
}
