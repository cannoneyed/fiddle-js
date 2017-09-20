import React from 'react'
import classnames from 'classnames'

import { Clip } from 'core/models/clip'

import ClipView from 'components/Clip'

const styles = require('./styles.less')

interface ComponentProps {
  clip: Clip
}

export default class ClipDrag extends React.Component<ComponentProps, {}> {
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
