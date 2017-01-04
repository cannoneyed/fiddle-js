import React, { Component, PropTypes } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import sequencerViewStore from 'core/sequencer/view'

import styles from './styles.less'

@inject(() => ({
  trackHeight: sequencerViewStore.trackHeight,
}))
@observer
export default class TrackHeaderContainer extends Component {
  static propTypes = {
    index: PropTypes.number.isRequired,
    trackHeight: PropTypes.number.isRequired,
    track: ObsPropTypes.observableObject.isRequired,
  }

  render() {
    const { index, trackHeight, track } = this.props

    const headerStyle = {
      height: trackHeight,
    }

    return (
      <div className={ styles.trackHeader } style={ headerStyle }>
        { index } : { track.id }
      </div>
    )
  }
}
