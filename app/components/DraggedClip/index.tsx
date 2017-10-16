import React, { Component } from 'react'

import { Clip } from 'core/models/clip'

import ClipView from 'components/Clip'

const styles = require('./styles.less')

interface ComponentProps {
  clip: Clip
}

export default class DraggedClip extends Component<ComponentProps, {}> {
  render() {
    const { clip } = this.props

    return (
      <div className={styles.draggedClipWrapper}>
        <ClipView clip={clip} />
      </div>
    )
  }
}
