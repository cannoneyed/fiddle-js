import React, { Component } from 'react'
import classnames from 'classnames'
import { inject, observer } from 'mobx-react'

const styles = require('./styles.less')

import { Clip as ClipModel } from 'core/models/clip'
import { sequencerView, SequencerView } from 'core/stores/sequencer/view'

interface ComponentProps {
  clip: ClipModel
  onMouseDown?: (event: React.MouseEvent<HTMLElement>) => any
  isDragging?: boolean
}

interface InjectedProps extends ComponentProps {
  sequencerView: SequencerView
}

@inject(() => ({
  sequencerView,
}))
@observer
export class Clip extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { clip, onMouseDown } = this.props
    const { sequencerView } = this.injected
    const { trackHeight } = sequencerView.tracks

    const clipStyle = {
      height: trackHeight,
      width: clip.width + 1,
    }

    const className = classnames(styles.clipContainer, clip.isSelected ? styles.isSelected : null)

    return <div id={clip.domId} className={className} style={clipStyle} onMouseDown={onMouseDown} />
  }
}
