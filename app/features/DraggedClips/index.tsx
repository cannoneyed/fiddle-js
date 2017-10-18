import React, { Component } from 'react'
import { IReactionDisposer } from 'mobx'
import { inject, observer } from 'mobx-react'

import Clip from 'core/models/clip'

import ClipView from 'components/Clip'
import Portal from 'components/Portal'

import observeClipsDrag from 'observers/clips-drag'

import clipDragInteraction, { ClipDragInteraction } from 'core/interactions/clips/drag'
import clipSelectInteraction, { ClipSelectInteraction } from 'core/interactions/clips/select'
import sequencerPortals from 'core/dom/sequencer/portal'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  clipDragInteraction: ClipDragInteraction
  clipSelectInteraction: ClipSelectInteraction
}

@inject(() => ({
  clipDragInteraction,
  clipSelectInteraction,
}))
@observer
export default class DraggedClips extends Component<ComponentProps, {}> {
  disposeObserver: IReactionDisposer

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    this.disposeObserver = observeClipsDrag()
  }

  componentWillUnmount() {
    this.disposeObserver()
  }

  renderDraggedClip = (clip: Clip) => {
    const { clipDragInteraction } = this.injected
    const relativePosition = clipDragInteraction.getRelativePosition(clip)
    const { x, y } = relativePosition

    const clipWrapperStyle = {
      top: y,
      left: x,
    }

    return (
      <div className={styles.draggedClipWrapper} style={clipWrapperStyle}>
        <ClipView clip={clip} isDragging />
      </div>
    )
  }

  render() {
    const { clipSelectInteraction } = this.injected
    const { selectedClips } = clipSelectInteraction

    const { draggedClipsRoot } = sequencerPortals
    if (!draggedClipsRoot) {
      return null
    }

    return (
      <Portal domNode={draggedClipsRoot}>
        <div className={styles.draggedClipsContainer} id="draggedClips">
          {selectedClips.map(this.renderDraggedClip)}
        </div>
      </Portal>
    )
  }
}
