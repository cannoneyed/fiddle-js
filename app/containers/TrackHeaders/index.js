import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import TrackHeader from 'containers/TrackHeader'

import * as trackSelectors from 'core/tracks'

import styles from './styles.less'

const mapStateToProps = createStructuredSelector({
  trackList: trackSelectors.getTrackList,
})

@connect(mapStateToProps)
export default class TrackHeadersContainer extends Component {
  static propTypes = {
    trackList: ImmutablePropTypes.list.isRequired,
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
