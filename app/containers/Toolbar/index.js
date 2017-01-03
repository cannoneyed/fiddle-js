import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from '@blueprintjs/core'

import styles from './styles.less'

@inject(store => ({
  createTrack: store.tracks.createTrack,
  zoomInHorizontal: store.sequencer.view.zoomInHorizontal,
  zoomOutHorizontal: store.sequencer.view.zoomOutHorizontal,
}))
@observer
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
      <div className={ styles.toolbarContainer }>
        <Button iconName="add" onClick={ () => createTrack() }>Add Track</Button>
        <Button iconName="zoom-in" onClick={ () => zoomInHorizontal() } />
        <Button iconName="zoom-out" onClick={ () => zoomOutHorizontal() } />
      </div>
    )
  }
}
