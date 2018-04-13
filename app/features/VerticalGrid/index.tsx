import * as React from 'react'
import { range } from 'lodash'

const styles = require('./styles.less')

interface ComponentProps {
  gridCount: number
  gridSegmentWidth: number
}

export class VerticalGrid extends React.Component<ComponentProps, {}> {
  render() {
    const { gridCount, gridSegmentWidth } = this.props

    const gridSegmentStyle = {
      minWidth: gridSegmentWidth,
    }

    return (
      <div className={styles.verticalGridContainer}>
        {range(gridCount).map((index: number) => (
          <div key={index} style={gridSegmentStyle} className={styles.gridSegment} />
        ))}
      </div>
    )
  }
}
