import React, { Component } from 'react'
import ImmutablePropTypes from 'react-immutable-proptypes'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import Track from 'containers/Track'

import * as trackSelectors from 'core/tracks'

const mapStateToProps = createStructuredSelector({
  trackList: trackSelectors.getTrackList,
})

@connect(mapStateToProps)
export default class TracksContainer extends Component {
  static propTypes = {
    trackList: ImmutablePropTypes.list.isRequired,
  }

  render() {
    const { trackList } = this.props

    return (
      <div>
        { trackList.map(({ id }, index) => (
          <Track id={ id } index={ index } key={ index } />
        ))}
      </div>
    )
  }
}
