import * as React from 'react'
import { observer } from 'mobx-react'

import Clip from 'core/models/Clip'

import { ClipWrapper } from './styled-components'

interface IComponentProps {
  clip: Clip
  height: number
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any
}

@observer
export default class ClipView extends React.Component<IComponentProps, {}> {
  render() {
    const { clip, height, onMouseDown } = this.props
    const { isDragging, isSelected, offsetX, width } = clip

    const left = isDragging ? 0 : offsetX - 1 // On drag, don't line up on track

    return (
      <ClipWrapper
        id={clip.domId}
        height={height}
        isDragging={isDragging}
        isSelected={isSelected}
        left={left}
        onMouseDown={onMouseDown}
        width={width + 1}
      />
    )
  }
}
