import * as React from 'react'
import { inject, observer } from 'mobx-react'

import { Track } from 'core/models/track'
import { sequencerView, SequencerView } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {
  index: number
  track: Track
}

interface InjectedProps extends ComponentProps {
  sequencerView: SequencerView
}

@inject(() => ({
  sequencerView,
}))
@observer
export class TrackHeader extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { index, track } = this.props
    const { sequencerView } = this.injected
    const { trackHeight } = sequencerView.tracks

    const headerStyle = {
      height: trackHeight,
    }

    return (
      <div className={styles.trackHeader} style={headerStyle}>
        {index} : {track.id}
      </div>
    )
  }
}
