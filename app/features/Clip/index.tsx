import * as React from 'react'
import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'features/ClipContextMenu'
import ClipDrag from 'features/ClipDrag'
import ClipView from 'components/Clip'

import Clip from 'core/models/clip'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import clipMouseInteraction, { ClipMouseInteraction } from 'core/interactions/clips/mouse'

interface ComponentProps {
  clip: Clip
}

interface InjectedProps extends ComponentProps {
  clipMouseInteraction: ClipMouseInteraction
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  clipMouseInteraction,
  sequencerViewStore
}))
@ContextMenuTarget
@observer
export default class ClipContainer extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  @autobind // Need to autobind because this method must be a class method, not babel-transformed
  renderContextMenu() {
    const { clip } = this.props
    return <ClipContextMenu clipId={clip.id} />
  }

  renderClip = () => {
    const { clip } = this.props
    const { handleClipMouseDown } = this.injected.clipMouseInteraction
    const { trackHeight } = this.injected.sequencerViewStore

    return (
      <ClipView height={trackHeight} clip={clip} onMouseDown={e => handleClipMouseDown(clip, e)} />
    )
  }

  render() {
    const { clip } = this.props

    return (
      <div>
        {clip.isDragging && <ClipDrag clip={clip} />}
        {!clip.isDragging && this.renderClip()}
      </div>
    )
  }
}
