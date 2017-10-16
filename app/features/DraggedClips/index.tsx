import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import DraggedClip from 'components/DraggedClip'
import Portal from 'components/Portal'

import observeClipsDrag from 'observers/clips-drag'

import clipDragInteraction, { ClipDragInteraction } from 'core/interactions/clips/drag'
import clipSelectInteraction, { ClipSelectInteraction } from 'core/interactions/clips/select'
import sequencerPortalDOMStore from 'core/stores/sequencer/dom/portal'

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
  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    observeClipsDrag()
  }

  render() {
    // const { isDragging } = clipDragInteraction
    // if (!isDragging) {
    //   return null
    // }

    const { clipSelectInteraction } = this.injected
    const { selectedClips } = clipSelectInteraction

    const { draggedClipsRoot } = sequencerPortalDOMStore
    if (!draggedClipsRoot) {
      return null
    }

    return (
      <Portal domNode={draggedClipsRoot}>
        <div className={styles.draggedClipsContainer} id="draggedClips">
          <h1>FUCK YOU</h1>
          {selectedClips.map(clip => <DraggedClip clip={clip} />)}
        </div>
      </Portal>
    )
  }
}