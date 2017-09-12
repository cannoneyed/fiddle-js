import * as React from 'react'
import { inject, observer } from 'mobx-react'

import TrackHeader from 'features/TrackHeader'
import { TrackStore } from 'core/stores/tracks'

import { SectionWrapper, Header, HeadersWrapper } from './styled-components'

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  trackStore: TrackStore
}

@inject('trackStore')
@observer
export default class TrackHeaders extends React.Component<ComponentProps, {}> {
  get injected() {
    return this.props as InjectedProps
  }

  render() {
    const { trackList } = this.injected.trackStore

    return (
      <SectionWrapper>
        <Header />
        <HeadersWrapper id="trackHeadersContainer">
          {trackList.map((track, index) => <TrackHeader track={track} index={index} key={index} />)}
        </HeadersWrapper>
      </SectionWrapper>
    )
  }
}
