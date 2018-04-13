import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import { sequencerLayout, SequencerLayout } from 'core/stores/sequencer/layout'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayout: SequencerLayout
}

@inject(() => ({
  sequencerLayout,
}))
@observer
export class TimelineGutter extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayout } = this.injected
    const { gutterWidth } = sequencerLayout

    const style = {
      minWidth: gutterWidth,
    }

    return <div style={style} className={styles.timelineGutterContainer} />
  }
}
