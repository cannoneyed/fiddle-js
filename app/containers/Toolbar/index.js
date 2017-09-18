import React, { Component, PropTypes } from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from '@blueprintjs/core'

import tracksStore from 'core/stores/tracks'
import sequencerViewStore from 'core/stores/sequencer/view'

import styles from './styles.less'

@inject(() => ({
  createTrack: tracksStore.createTrack,
  zoomInHorizontal: sequencerViewStore.zoomInHorizontal,
  zoomOutHorizontal: sequencerViewStore.zoomOutHorizontal,
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
