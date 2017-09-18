import React, { Component } from 'react'
import { PropTypes as ObsPropTypes } from 'mobx-react'
import classnames from 'classnames'

import Clip from 'components/Clip'

import styles from './styles.less'

export default class ClipDrag extends Component {
  static propTypes = {
    clip: ObsPropTypes.observableObject.isRequired,
  }

  render() {
    const {
      clip,
    } = this.props

    const style = {
      top: clip.dragStartY,
      left: clip.dragStartX,
      backgroundColor: 'blue',
    }

    const className = classnames(
      styles.clipDragWrapper,
      'draggedClip',
    )

    return (
      <div className={ className } style={ style } >
        <Clip clip={ clip } />
      </div>
    )
  }
}
