import React, { Component } from 'react'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'

import TrackHeader from 'containers/TrackHeader'

import styles from './styles.less'

@inject(store => ({
  trackList: store.tracks.trackList,
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
      <div className={ styles.trackHeadersContainer }>
        { trackList.map(({ id }, index) => (
          <TrackHeader id={ id } index={ index } key={ index } />
        ))}
      </div>
    )
  }
}
