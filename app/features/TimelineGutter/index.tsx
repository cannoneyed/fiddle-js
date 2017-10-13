import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'

import sequencerLayoutStore, { SequencerLayoutStore } from 'core/stores/sequencer/layout'

import * as styles from './styles'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayoutStore: SequencerLayoutStore
}

@inject(() => ({
  sequencerLayoutStore,
}))
@observer
export default class TimelineGutter extends Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { sequencerLayoutStore } = this.injected
    const { gutterWidth } = sequencerLayoutStore

    const style = {
      minWidth: gutterWidth,
    }

    return (
      <div style={style} className={styles.timelineGutterContainer} id="timelineGutterContainer" />
    )
  }
}
