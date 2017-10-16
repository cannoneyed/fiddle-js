import React, { Component } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import ClipContextMenu from 'features/ClipContextMenu'
import ClipView from 'components/Clip'

import { Clip } from 'core/models/clip'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'
import { handleClipMouseDown } from 'interactions/clip/mouse'

interface ComponentProps {
  clip: Clip
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@ContextMenuTarget
@observer
export default class ClipContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  @autobind // Need to autobind because this method must be a class method, not babel-transformed
  renderContextMenu() {
    const { clip } = this.props
    return <ClipContextMenu clipId={clip.id} />
  }

  render() {
    const { clip } = this.props

    return (
      <div>
        <ClipView clip={clip} onMouseDown={e => handleClipMouseDown(clip, e)} />
      </div>
    )
  }
}
