import React, { Component, PropTypes } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import Track from 'containers/Track'
import VerticalGrid from 'components/VerticalGrid'

import sequencerViewStore from 'core/sequencer/view'
import tracksStore from 'core/tracks'

import styles from './styles.less'

@inject(() => ({
  gridCount: sequencerViewStore.gridCount,
  gridSegmentWidth: sequencerViewStore.gridSegmentWidth,
  trackList: tracksStore.trackList,
}))
@observer
export default class TracksContainer extends Component {
  static propTypes = {
    gridCount: PropTypes.number.isRequired,
    gridSegmentWidth: PropTypes.number.isRequired,
    trackList: ObsPropTypes.observableArray.isRequired,
  }

  render() {
    const {
      gridCount,
      gridSegmentWidth,
      trackList,
    } = this.props

    return (
      <div className={ styles.tracksWrapper }>
        <VerticalGrid gridCount={ gridCount } gridSegmentWidth={ gridSegmentWidth } />
        <div className={ styles.tracksContainer }>
          { trackList.map(({ id }, index) => (
            <Track trackId={ id } index={ index } key={ index } />
          ))}
        </div>
      </div>
    )
  }
}
