import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import styles from './styles.less'

import sequencerViewStore from 'core/stores/sequencer/view'

@inject(() => ({
  height: sequencerViewStore.trackHeight,
}))
@observer
export default class ClipView extends Component {
  static propTypes = {
    clip: ObsPropTypes.observableObject.isRequired,
    height: PropTypes.number.isRequired,
    onMouseDown: PropTypes.func.isRequired,
  }

  render() {
    const {
      clip,
      height,
      onMouseDown,
    } = this.props

    const clipStyle = {
      height,
      width: clip.width + 1,
      left: clip.isDragging ? 0 : clip.offsetX - 1, // On drag, don't line up on track
      borderColor: clip.isDragging ? 'red' : 'white',
    }

    const className = classnames(
      styles.clipContainer,
      clip.isSelected ? styles.isSelected : null,
    )

    return (
      <div
        id={ clip.domId }
        className={ className }
        style={ clipStyle }
        onMouseDown={ onMouseDown }
      />
    )
  }
}
