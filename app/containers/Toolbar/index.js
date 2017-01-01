import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { Button } from '@blueprintjs/core'

import * as trackActions from 'core/tracks'

const mapDispatchToProps = {
  createTrack: trackActions.createTrack,
}

@connect(null, mapDispatchToProps)
export default class ToolbarContainer extends Component {
  static propTypes = {
    createTrack: PropTypes.func.isRequired,
  }

  render() {
    const { createTrack } = this.props

    return (
      <div>
        <Button iconName="add" onClick={ createTrack } />
      </div>
    )
  }
}
