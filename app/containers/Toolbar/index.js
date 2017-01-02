import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from '@blueprintjs/core'

import * as trackActions from 'core/tracks'
import * as sequencerViewActions from 'core/sequencer/view'

const mapDispatchToProps = {
  createTrack: trackActions.createTrack,
  zoomInHorizontal: sequencerViewActions.zoomInHorizontal,
  zoomOutHorizontal: sequencerViewActions.zoomOutHorizontal,
}

@connect(null, mapDispatchToProps)
export default class ToolbarContainer extends Component {
  static propTypes = {
    createTrack: PropTypes.func.isRequired,
    zoomInHorizontal: PropTypes.func.isRequired,
    zoomOutHorizontal: PropTypes.func.isRequired,
  }

  render() {
    const {
      createTrack,
      zoomInHorizontal,
      zoomOutHorizontal,
    } = this.props

    return (
      <div>
        <Button iconName="add" onClick={ createTrack }>Add Track</Button>
        <Button iconName="zoom-in" onClick={ zoomInHorizontal } />
        <Button iconName="zoom-out" onClick={ zoomOutHorizontal } />
      </div>
    )
  }
}
