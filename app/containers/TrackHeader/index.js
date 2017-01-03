import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'

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
    trackId: PropTypes.string.isRequired,
  }

  render() {
    const { index, trackHeight, trackId } = this.props

    const headerStyle = {
      height: trackHeight,
    }

    return (
      <div className={ styles.trackHeader } style={ headerStyle }>
        { index } : { trackId }
      </div>
    )
  }
}
