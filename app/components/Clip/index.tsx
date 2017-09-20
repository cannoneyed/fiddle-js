import React from 'react'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'

const styles = require('./styles.less')

import { Clip } from 'core/models/clip'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

interface ComponentProps {
  clip: Clip
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class ClipView extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { clip, onMouseDown } = this.props
    const { sequencerViewStore } = this.injected
    const { trackHeight } = sequencerViewStore

    const clipStyle = {
      height: trackHeight,
      width: clip.width + 1,
      left: clip.offsetX - 1,
      borderColor: clip.isDragging ? 'red' : 'white',
    }

    const className = classnames(styles.clipContainer, clip.isSelected ? styles.isSelected : null)

    return <div id={clip.domId} className={className} style={clipStyle} onMouseDown={onMouseDown} />
  }
}
