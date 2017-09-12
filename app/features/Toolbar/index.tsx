import * as React from 'react'
import { inject, observer } from 'mobx-react'
import { Button } from '@blueprintjs/core'

import { SequencerViewStore } from 'core/stores/sequencer/view'
import { TrackStore } from 'core/stores/tracks'

import { ToolbarWrapper } from './styled-components'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
  trackStore: TrackStore
}

@inject('sequencerViewStore', 'trackStore')
@observer
export default class Toolbar extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { createTrack } = this.injected.trackStore
    const { zoomInHorizontal, zoomOutHorizontal } = this.injected.sequencerViewStore

    return (
      <ToolbarWrapper>
        <Button iconName="add" onClick={() => createTrack()}>
          Add Track
        </Button>
        <Button iconName="zoom-in" onClick={() => zoomInHorizontal()} />
        <Button iconName="zoom-out" onClick={() => zoomOutHorizontal()} />
      </ToolbarWrapper>
    )
  }
}
