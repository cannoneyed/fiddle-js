import * as React from 'react'
import { range } from 'lodash'

import { GridWrapper, GridSegment } from './styled-components'

interface IComponentProps {
  gridCount: number
  gridSegmentWidth: number
}

export default class VerticalGrid extends React.Component<IComponentProps, {}> {
  render() {
    const { gridCount, gridSegmentWidth } = this.props

    return (
      <GridWrapper id="verticalGridContainer">
        {range(gridCount - 1).map(index => <GridSegment key={index} minWidth={gridSegmentWidth} />)}
      </GridWrapper>
    )
  }
}
