import React, { Component } from 'react'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'

const styles = require('./styles.less')

import { Clip } from 'core/models/clip'
import sequencerViewStore, { SequencerViewStore } from 'core/stores/sequencer/view'

interface ComponentProps {
  clip: Clip
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any
  isDragging?: boolean
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject(() => ({
  sequencerViewStore,
}))
@observer
export default class ClipView extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { clip, onMouseDown } = this.props
    const { sequencerViewStore } = this.injected
    const { trackHeight } = sequencerViewStore.tracks

    const clipStyle = {
      height: trackHeight,
      width: clip.width + 1,
    }

    const className = classnames(styles.clipContainer, clip.isSelected ? styles.isSelected : null)

    return <div id={clip.domId} className={className} style={clipStyle} onMouseDown={onMouseDown} />
  }
}
