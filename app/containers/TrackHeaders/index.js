import React, { Component } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import TrackHeader from 'containers/TrackHeader'

import tracksStore from 'core/tracks'

import styles from './styles.less'

@inject(() => ({
  trackList: tracksStore.trackList,
}))
@observer
export default class TrackHeadersContainer extends Component {
  static propTypes = {
    trackList: ObsPropTypes.observableArray.isRequired,
  }

  render() {
    const {
      trackList,
    } = this.props

    return (
      <div className={ styles.trackHeadersSectionContainer }>
        <div className={ styles.trackHeadersHeader } />
        <div className={ styles.trackHeadersContainer } id="trackHeadersContainer">
          { trackList.map(({ id }, index) => (
            <TrackHeader trackId={ id } index={ index } key={ index } />
          ))}
        </div>
      </div>
    )
  }
}
