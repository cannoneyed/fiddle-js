import React, { Component, PropTypes } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import Track from 'containers/Track'
import VerticalGrid from 'components/VerticalGrid'

import styles from './styles.less'

@inject(store => ({
  gridCount: store.sequencer.view.gridCount,
  gridWidth: store.sequencer.view.gridWidth,
  trackList: store.tracks.trackList,
}))
@observer
export default class TracksContainer extends Component {
  static propTypes = {
    gridCount: PropTypes.number.isRequired,
    gridWidth: PropTypes.number.isRequired,
    trackList: ObsPropTypes.observableArray.isRequired,
  }

  render() {
    const {
      gridCount,
      gridWidth,
      trackList,
    } = this.props

    return (
      <div className={ styles.tracksWrapper }>
        <VerticalGrid gridCount={ gridCount } gridWidth={ gridWidth } />
        <div className={ styles.tracksContainer }>
          { trackList.map(({ id }, index) => (
            <Track id={ id } index={ index } key={ index } />
          ))}
        </div>
      </div>
    )
  }
}
