import React from 'react'
import { inject, observer } from 'mobx-react'

import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayoutStore: SequencerLayoutStore
}

@inject(() => ({
  sequencerLayoutStore,
}))
@observer
export default class TimelineLayout extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { timelineHeight } = sequencerLayoutStore

    const style = {
      height: timelineHeight,
    }

    return (
      <div className={styles.timelineLayoutWrapper} style={style}>
        {this.props.children}
      </div>
    )
  }
}
