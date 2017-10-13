import React, { Component } from 'react'
import classnames from 'classnames'

import { Clip } from 'core/models/clip'

import ClipView from 'components/Clip'

import * as styles from './styles'

interface ComponentProps {
  clip: Clip
}

export default class ClipDrag extends Component<ComponentProps, {}> {
  render() {
    const { clip } = this.props

    const style = {
      top: clip.dragStartY,
      left: clip.dragStartX,
      backgroundColor: 'blue',
    }

    const className = classnames(styles.clipDragWrapper, 'draggedClip')

    return (
      <div className={className} style={style}>
        <ClipView clip={clip} />
      </div>
    )
  }
}
