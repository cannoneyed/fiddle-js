import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import clipDragInteraction, { ClipDragInteraction } from 'core/interactions/clips/drag'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  clipDragInteraction: ClipDragInteraction
}

@inject(() => ({
  clipDragInteraction,
}))
@observer
export default class DraggedClips extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { isDragging } = clipDragInteraction
    if (!isDragging) {
      return null
    }

    return (
      <div className={styles.draggedClipsContainer} id="draggedClips">
        <h1>FUCK YOU</h1>
      </div>
    )
  }
}
