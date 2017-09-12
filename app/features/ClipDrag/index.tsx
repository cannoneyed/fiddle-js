import * as React from 'react'
import { inject, observer } from 'mobx-react'
import * as Portal from 'react-portal'

import ClipView from 'components/Clip'

import { ClipDragWrapper } from './styled-components'

import Clip from 'core/models/clip'
import { ClipDragInteraction } from 'core/interactions/clips/drag'
import { SequencerViewStore } from 'core/stores/sequencer/view'

interface ComponentProps {
  clip: Clip
}

interface InjectedProps extends ComponentProps {
  clipDragInteraction: ClipDragInteraction
  sequencerViewStore: SequencerViewStore
}

@inject('clipDragInteraction')
@observer
export default class ClipDrag extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { clip } = this.props
    const { dragDeltaX, dragDeltaY } = this.injected.clipDragInteraction
    const { trackHeight } = this.injected.sequencerViewStore

    const style = {
      left: clip.dragStartX || 0 + dragDeltaX,
      top: clip.dragStartY || 0 + dragDeltaY,
    }

    return (
      <Portal isOpened={clip.isDragging}>
        <ClipDragWrapper style={style}>
          <ClipView height={trackHeight} clip={clip} />
        </ClipDragWrapper>
      </Portal>
    )
  }
}
