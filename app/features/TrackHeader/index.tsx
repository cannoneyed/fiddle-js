import * as React from 'react'
import { inject, observer } from 'mobx-react'

import Track from 'core/models/track'
import { SequencerViewStore } from 'core/stores/sequencer/view'

import { TrackHeaderWrapper } from './styled-components'

interface ComponentProps {
  index: number
  track: Track
}

interface InjectedProps extends ComponentProps {
  sequencerViewStore: SequencerViewStore
}

@inject('sequencerViewStore')
@observer
export default class TrackHeader extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { index, track } = this.props
    const { trackHeight } = this.injected.sequencerViewStore

    return (
      <TrackHeaderWrapper height={trackHeight}>
        {index} : {track.id}
      </TrackHeaderWrapper>
    )
  }
}
