import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import Caret from 'components/Caret'

import sequencerPositionService from 'core/services/sequencer/position'

import sequencerLayout, { SequencerLayoutStore } from 'core/stores/sequencer/layout'
import timelineView, { TimelineView } from 'core/stores/sequencer/view/timeline'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayout: SequencerLayoutStore
  timelineView: TimelineView
}

@inject(() => ({
  sequencerLayout,
  timelineView,
}))
@observer
export default class TimelineContainer extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayout, timelineView } = this.injected
    const { dragToMarker } = timelineView

    if (!dragToMarker) {
      return null
    }

    const timelineHeight = sequencerLayout.timelineHeight
    const offsetX = sequencerPositionService.getOffsetX(dragToMarker)

    const caretSize = 10

    const style = {
      left: offsetX - caretSize / 2 - 1,
      top: timelineHeight - caretSize + 2,
    }

    return (
      <div className={styles.dragToMarkerContainer} style={style}>
        <Caret size={caretSize} />
      </div>
    )
  }
}
