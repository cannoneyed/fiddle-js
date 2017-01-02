import React, { Component, PropTypes } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Track from 'containers/Track'
import VerticalGrid from 'components/VerticalGrid'

import * as trackSelectors from 'core/tracks'
import * as sequencerViewSelectors from 'core/sequencer/view'

import styles from './styles.less'

const mapStateToProps = createStructuredSelector({
  gridCount: sequencerViewSelectors.getGridCount,
  gridWidth: sequencerViewSelectors.getGridWidth,
  trackList: trackSelectors.getTrackList,
})

@connect(mapStateToProps)
export default class TracksContainer extends Component {
  static propTypes = {
    gridCount: PropTypes.number.isRequired,
    gridWidth: PropTypes.number.isRequired,
    trackList: ImmutablePropTypes.list.isRequired,
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
        <div className= {styles.tracksContainer }>
          { trackList.map(({ id }, index) => (
            <Track id={ id } index={ index } key={ index } />
          ))}
        </div>
      </div>
    )
  }
}
